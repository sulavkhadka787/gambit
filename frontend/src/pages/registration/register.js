import React, { useState } from "react";
import axios from "../../axios";
import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import "./register.css";
import bcrypt from "bcryptjs";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const saltRounds = 10;

  function validateFormFields() {
    return false;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const salt = bcrypt.genSaltSync(saltRounds);
    await axios.post("/users", {
      username: username,
      password: bcrypt.hashSync(password, salt),
    });
  }

  return (
    <div className="appRegister">
      <h1>Welcome to Gambit!</h1>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="username">
          <FormLabel>Username</FormLabel>
          <FormControl
            autoFocus
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block disabled={!validateFormFields()} type="submit">
          Create User
        </Button>
      </form>
    </div>
  );
};

export default Register;
