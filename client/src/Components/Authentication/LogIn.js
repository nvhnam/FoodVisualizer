import React, { useState, useEffect, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";
import GoogleButton from "react-google-button";
const PORT = process.env.REACT_APP_PORT;
const URL = process.env.REACT_APP_URL || `http://localhost:${PORT}`;

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const location = useLocation();

  const validate = () => {
    const newErrors = {};
    if (!values.email) newErrors.email = "* Email is required";
    if (!values.password) newErrors.password = "* Password is required";
    return newErrors;
  };

  console.log(values);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });

    const newErrors = { ...errors };
    if (name === "email") {
      newErrors.email = value ? "" : "* Email is required";
    }
    if (name === "password") {
      newErrors.password = value ? "" : "* Password is required";
    }
    setErrors(newErrors);
  };

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  const hasAlerted = useRef(false);

  useEffect(() => {
    if (hasAlerted.current) return;

    const queryParameter = new URLSearchParams(location.search);

    if (queryParameter.get("error") === "invalid_token") {
      window.alert("Verification failed!");
    } else if (queryParameter.get("success") === "valid_token") {
      window.alert("Verification success!");
    }

    hasAlerted.current = true;
  }, [location]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      axios
        .post(
          `${URL || `http://localhost:${PORT}`}/auth/login`,
          JSON.stringify(values),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log("res: ", res);
          if (res.status === 200) {
            setCurrentUser(res.data.user);
            console.log("User: ", res.data.user);
            const token = res.data.token;
            console.log("Token: ", token);
            setSuccess(true);
            setLoginError("");
            // window.alert("Login successful! Redirecting...");
            localStorage.setItem("token", token);
            setTimeout(() => navigate("/"), 100);
          } else {
            setLoginError(res.data.message);
            setSuccess(false);
            window.alert(res.data.message);
          }
        })
        .catch((err) => {
          console.error("Error:", err);
          if (err.response.status === 403) {
            window.alert(err.response.data.error);
          } else if (err.response.status === 401) {
            window.alert(err.response.data.error);
          } else if (err.response.status === 302) {
            window.alert(err.response.data.error);
          } else {
            setLoginError("Login failed. Please try again.");
            window.alert("Login failed. Please try again.");
          }
          setSuccess(false);
        });
    } else {
      setErrors(formErrors);
      window.alert("Please fill out all required fields.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${URL || `http://localhost:${PORT}`}/auth/google`;
  };

  // const { login } = useContext(AuthContext);

  // const login = () => {};

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await login(values);
  //     navigate("/");
  //   } catch (error) {
  //     setErrors(error.response.data);
  //   }
  // };

  const defaultTheme = createTheme();

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="/">
          NutriGuide
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div className="mt-5 mb-2 w-100 d-flex justify-content-center align-items-center">
          <GoogleButton onClick={handleGoogleLogin} />
        </div>
        <div className="w-75 d-flex align-items-center my-3">
          <hr
            className="flex-grow-1 w-50 align-items-center d-flex border-2 border-dark"
            style={{ height: "1px", padding: "2px" }}
          />
          <span className="mx-2 text-muted fw-bold">OR</span>
          <hr
            className="flex-grow-1 w-50 border-2 border-dark"
            style={{ height: "1px", padding: "2px" }}
          />
        </div>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={values.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default Login;
