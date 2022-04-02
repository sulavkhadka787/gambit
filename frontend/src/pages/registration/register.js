import React, { useState, useEffect } from "react";
import axios from "../../services/axios";
import {
  Alert,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import "./register.css";
import bcrypt from "bcryptjs";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertUsername, setAlertUsername] = useState("");
  const [alertPassword, setAlertPassword] = useState("");
  const [usernames, setUsernames] = useState([]);
  const saltRounds = 10;
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get("/users");
      const usernameSet = new Set();
      req.data.forEach((item) => {
        usernameSet.add(item.username);
      });
      setUsernames(usernameSet);
    }
    fetchData();
    return () => {};
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const salt = bcrypt.genSaltSync(saltRounds);
    await axios.post("/users", {
      username: username,
      password: bcrypt.hashSync(password, salt),
    });
    history.push("/login");
  }

  function handleUsernameChange(event) {
    const currentUsername = event.target.value;
    setUsername(currentUsername);
    if (currentUsername.length < 5) {
      setAlertUsername("Username is too short");
    } else {
      setAlertUsername("");
      if (username.has(currentUsername)) {
        setAlertUsername("Username already exists");
      }
    }
  }

  function handlePasswordChange(event) {
    const currentPassword = event.target.value;
    setPassword(currentPassword);
    if (currentPassword.length < 8) {
      setAlertPassword("Password is too short. Minimum 8 characters");
    } else {
      setAlertPassword("");
    }
  }

  function handleConfirmPasswordChange(event) {
    const currentConfirmPassword = event.target.value;
    setConfirmPassword(currentConfirmPassword);
    if (password.length < 8) {
      return;
    }

    if (currentConfirmPassword !== password) {
      setAlertPassword("Password do not match");
    } else {
      setAlertPassword("");
    }
  }

  function validateFields() {
    return (
      password.length > 0 &&
      username.length > 0 &&
      alertPassword.length === 0 &&
      alertUsername.length === 0
    );
  }

  return (
    <div className="appRegister">
      <h1>Welcome to Gambit!</h1>
      <form onSubmit={handleSubmit}>
        {alertUsername.length > 0 && (
          <Alert variant="primary">{alertUsername}</Alert>
        )}
        <FormGroup controlId="username">
          <FormLabel>Username</FormLabel>
          <FormControl
            autoFocus
            type="text"
            value={username}
            onChange={(e) => handleUsernameChange(e)}
          />
        </FormGroup>
        {alertPassword.length > 0 && (
          <Alert variant="primary">{alertPassword}</Alert>
        )}
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={(e) => handlePasswordChange(e)}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            value={confirmPassword}
            onChange={(e) => handleConfirmPasswordChange(e)}
            type="password"
          />
        </FormGroup>
        <Button block disabled={!validateFields()} type="submit">
          Create User
        </Button>
      </form>
    </div>
  );
};

export default Register;
