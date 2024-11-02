import React from "react";
import "./Login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import bitLogo from "../../../assets/images/bitLogo.png";
import { useNavigate } from "react-router-dom";
import { useLoginDetails } from "../../../Query/Hooks/useLoginDetails";
import { useForm } from "react-hook-form";

export const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [user, setUser] = React.useState("student");

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  const loginMutation = useLoginDetails();
  const navigate = useNavigate();
  console.log(errors);

  const onSubmit = async (data) => {
    await loginMutation
      .mutateAsync(data)
      .then(() => {
        if (data.role === "admin") {
          navigate("./admin");
        } else if (data.role === "student") {
          navigate(`./student/${data.username}`);
        } else {
          navigate("./guide");
        }
      })
      .catch((error) => {
        setError("password", { type: "manual", message: error.response.data });
      });
  };

  return (
    <div className="body">
      <div className="layout">
        <div className="welcome">
          Welcome Back!
          <img className="bitLogo" src={bitLogo} alt="bitLogo" />
        </div>
        <div className="login">
          <div className="title">PROJECT WORK DASHBOARD</div>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sign in as</InputLabel>
              <Select
                {...register("role")}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={user}
                label="Sign in as"
                onChange={handleChange}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="guide">Guide</MenuItem>
              </Select>
            </FormControl>
            <div>
              <TextField
                {...register("username", {
                  required: { value: true, message: "Username is required" },
                })}
                id="outlined-basic"
                label="Username"
                variant="outlined"
              />
              {errors.username && (
                <p style={{ color: "red", margin: "0px 0px 0px 2px" }}>
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <TextField
                {...register("password", {
                  required: { value: true, message: "Password is required" },
                })}
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
              {errors.password && (
                <p style={{ color: "red", margin: "0px 0px 0px 2px" }}>
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button variant="contained" className="loginButton" type="submit">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
