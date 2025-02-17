import express from "express";
import passport from "passport";
import cors from "cors";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { dbPool } from "../dbconfig.js";
import cookieSession from "cookie-session";

const CLIENT_PORT = process.env.CLIENT_PORT;
const CLIENT_URL = process.env.CLIENT_URL || `http://localhost:${CLIENT_PORT}`;
const SERVER_PORT = process.env.PORT;
const SERVER_URL = process.env.BACKEND_URL || `http://localhost:${SERVER_PORT}`;
const USER_PROFILE_URL = process.env.USER_PROFILE_URL;

const oauth2User = express.Router();

oauth2User.use(
  cors({
    origin: `${CLIENT_URL || `http://localhost:${CLIENT_PORT}`}`,
    credentials: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
  })
);

oauth2User.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_SECRET || "default_secret"],
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    secure: process.env.NODE_ENV === "production" ? true : false,
    httpOnly: true,
  })
);

oauth2User.use((req, res, next) => {
  if (req.session) {
    if (typeof req.session.regenerate !== "function") {
      req.session.regenerate = (callback) => {
        if (typeof callback === "function") callback();
      };
    }
    if (typeof req.session.save !== "function") {
      req.session.save = (callback) => {
        if (typeof callback === "function") callback();
      };
    }
  }
  next();
});

oauth2User.use(passport.initialize());
oauth2User.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `/auth/google/callback`,
      // callbackURL: `${
      //   SERVER_URL || `http://localhost:${SERVER_PORT}`
      // }/auth/google/callback`,
      userProfileURL: USER_PROFILE_URL,
      state: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const checkExist = "SELECT * FROM user WHERE google_id = ? LIMIT 1";
        const [results] = await dbPool.query(checkExist, [profile.id]);
        // const user = results[0];

        if (results.length > 0) {
          return done(null, results[0]);
        } else {
          const sql =
            "INSERT INTO user (username, email, google_id) VALUES (?, ?, ?)";
          const [result] = await dbPool.query(sql, [
            profile.displayName,
            profile.emails[0].value,
            profile.id,
          ]);
          // const user = result[0];

          const [newUser] = await dbPool.query(checkExist, [profile.id]);
          return done(null, newUser[0]);
        }
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  // console.log("Serializing User:", user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // console.log("Deserializing user:", user);
  done(null, user);
});

oauth2User.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

oauth2User.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: `${CLIENT_URL || `http://localhost:${CLIENT_PORT}`}`,
    failureRedirect: `${CLIENT_URL || `http://localhost:${CLIENT_PORT}`}/login`,
  })
  // ,
  // (req, res) => {
  //   res.redirect("/profile");
  // }
);

oauth2User.get("/profile", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Origin",
    `${CLIENT_URL || `http://localhost:${CLIENT_PORT}`}`
  );
  // another common pattern
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.user) {
    const user = {
      id: req.user.userId,
      username: req.user.username,
      email: req.user.email,
    };
    res.json(user);
  }
});

oauth2User.post("/logout", (req, res) => {
  req.session = null;
  res.clearCookie("session");
  res.json({ message: "Logout successful" });
});

export default oauth2User;
