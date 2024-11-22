import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";
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
          console.log(res);
          if (res.data.status === 200) {
            setCurrentUser(res.data.user);
            console.log("User: ", res.data.user);
            const token = res.data.token;
            console.log("Token: ", token);
            setSuccess(true);
            setLoginError("");
            // window.alert("Login successful! Redirecting...");
            localStorage.setItem("token", token);
            setTimeout(() => navigate("/"), 1000);
          } else {
            setLoginError(res.data.message);
            setSuccess(false);
            window.alert(res.data.message);
          }
        })
        .catch((err) => {
          console.error("Error:", err);
          setLoginError("Login failed. Please try again.");
          setSuccess(false);
          window.alert("Login failed. Please try again.");
        });
    } else {
      setErrors(formErrors);
      window.alert("Please fill out all required fields.");
    }
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
          NutrinSight
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
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">@gmail.com</InputAdornment>
              ),
            }}
            aria-describedby="email-helper-text"
          />
          <Typography
            id="email-helper-text"
            variant="body2"
            sx={{
              color: "text.secondary",
              mt: 0.5,
              fontSize: "0.75rem",
              fontStyle: "italic",
            }}
          >
            Enter your email without "@gmail.com"
          </Typography>

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
