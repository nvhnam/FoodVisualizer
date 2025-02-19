import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./Registration.css";

const PORT = process.env.REACT_APP_PORT;
const URL = process.env.REACT_APP_URL || `http://localhost:${PORT}`;

const Registration = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [errorExist, setErrorExist] = useState("");

  const validate = () => {
    const newErrors = {};

    // Check username
    if (!values.username) {
      newErrors.username = "* Username is required";
    } else {
      const regex = /[\/\\\[\];|=,+\*\?<>]/;
      if (regex.test(values.username)) {
        newErrors.username =
          "* Username should not contain special characters: / \\ [ ] ; | = , + * ? < >";
      }
    }

    if (!values.email) {
      newErrors.email = "* Email is required";
    }

    if (!values.password) {
      newErrors.password = "* Password is required";
    } else if (values.password.length < 6) {
      newErrors.password = "* Password must be at least 6 characters long";
    }

    return newErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });

    const newErrors = { ...errors };

    if (name === "username") {
      const usernameRegex = /^[a-zA-Z0-9]+$/;
      newErrors.username = !value
        ? "* Username is required"
        : usernameRegex.test(value)
        ? ""
        : errors.username;
    }

    if (name === "email") {
      newErrors.email = !value && "* Email is required" ? "" : errors.email;
    }

    if (name === "password") {
      newErrors.password = !value
        ? "* Password is required"
        : value.length >= 6
        ? ""
        : errors.password;
    }

    setErrors(newErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      axios
        .post(
          `${URL || `http://localhost:${PORT}`}/auth/register`,
          JSON.stringify(values),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.status === 200) {
            setSuccess(true);
            setErrorExist("");
            window.alert(res.data.message);
            // setTimeout(() => navigate("/login"), 1000);
          } else {
            setErrors({ general: res.data.error });
            setSuccess(false);
          }
        })
        .catch((err) => {
          console.error("Error:", err);
          setErrorExist("Username or Email exists!");
          setSuccess(false);
        });
    } else {
      setErrors(formErrors);
    }
  };

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
        <Avatar sx={{ m: 1, bgcolor: "warning.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="username"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                value={values.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="age"
                label="Age"
                name="age"
                autoComplete="family-name"
                value={values.age}
                onChange={handleChange}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                autoComplete="password"
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          {errorExist && (
            <Typography color="error" variant="subtitle1">
              {errorExist}
            </Typography>
          )}
          {errors.general && (
            <Typography color="error" variant="subtitle1">
              {errors.general}
            </Typography>
          )}
          {success && (
            <Typography
              className="textcenter"
              style={{ color: "green" }}
              variant="subtitle1"
            >
              Success
            </Typography>
          )}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account?{" "}
                <span style={{ color: "blue" }}>Sign in</span>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default Registration;
