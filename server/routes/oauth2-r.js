import cookieSession from "cookie-session";
import express from "express";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "../prisma/auth.js";

const CLIENT_PORT = process.env.CLIENT_PORT;
const CLIENT_URL = process.env.CLIENT_URL || `http://localhost:${CLIENT_PORT}`;
const SERVER_PORT = process.env.PORT;
const USER_PROFILE_URL = process.env.USER_PROFILE_URL;

const oauth2User = express.Router();

oauth2User.use(
  cors({
    origin: `${CLIENT_URL || `http://localhost:${CLIENT_PORT}`}`,
    credentials: true,
  })
);

oauth2User.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

oauth2User.use(passport.initialize());
oauth2User.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:${SERVER_PORT}/auth/google/callback`,
      userProfileURL: USER_PROFILE_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await prisma.user.findUnique({
          where: { googleId: profile.id },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              username: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
            },
          });
        }

        return done(null, user);
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
    failureRedirect: `${CLIENT_URL || `http://localhost:${CLIENT_PORT}/login`}`,
  })
  // ,
  // (req, res) => {
  //   res.redirect("/profile");
  // }
);

oauth2User.get("/profile", (req, res) => {
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
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ message: "Logout failed", error: err });
    }
    req.session.destroy((err) => {
      if (err) {
        console.error("Session destruction error:", err);
        return res
          .status(500)
          .json({ message: "Session destruction failed", error: err });
      }
      res.clearCookie("connect.sid");
      return res.json({ message: "Logout successful" });
    });
  });
});

export default oauth2User;
