import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateFormFields() {
    return username.length >= 5 && password.length >= 8;
  }

  async function handleSubmit(event) {
    event.preventDefault();
  }
  return (
    <div className="appLogin">
      <h1>Welcome to Gambit!</h1>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="username" bsSize="large">
          <FormLabel>Username</FormLabel>
          <FormControl
            autoFocus
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block disabled={!validateFormFields()} type="submit">
          Login
        </Button>
        <Button block href="/register">
          SignUp
        </Button>
      </form>
    </div>
  );
};

export default Login;
