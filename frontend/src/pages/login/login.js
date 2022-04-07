import React, { useState, useEffect } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./login.css";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useUser } from "../contexts/user-context";
import validUser from "../validUser";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginAlert, setLoginAlert] = useState("");
  const history = useHistory();
  const { user } = useUser();

  function validateFormFields() {
    return username.length >= 5 && password.length >= 8;
  }

  useEffect(() => {
    if (validUser(user)) {
      setLoginAlert("");
      history.push("/home");
    }
    return () => {};
  }, [user, history]);

  function handleSubmit(e) {
    e.preventDefault();
    setPassword("");
    props.onLogin(username, password);
    setLoginAlert("Incorrect username or password");
  }
  return (
    <div className="appLogin">
      <h1>Welcome to Gambit!</h1>
      <form onSubmit={handleSubmit}>
        {loginAlert.length > 0 && <Alert variant="primary">{loginAlert}</Alert>}
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
