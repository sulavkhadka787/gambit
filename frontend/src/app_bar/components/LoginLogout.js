import React, { useRef } from "react";
import { Button } from "@material-ui/core";
import { useAuth } from "../../pages/contexts/auth-context";
import validUser from "../../pages/validUser";
import { useDetectOutsideClick } from "../../helpers/useDetectOutsideClick";
import { useUser } from "../../pages/contexts/user-context";
import "./LoginLogout.css";

function LoginLogout(props) {
  const user = props.user;
  const { setAuthCookie } = useAuth();
  const dropdownRef = useRef(null);
  const [show, setShow] = useDetectOutsideClick(dropdownRef, false);

  function appLogout(e) {
    e.preventDefault();
    setAuthCookie("");
  }

  if (!validUser(user)) {
    return (
      <Button href="/login" color="inherit">
        Login
      </Button>
    );
  }
  return (
    <div>
      <Button href="/home" color="inherit" onClick={appLogout}>
        Logout
      </Button>
      <h2>{user.username}</h2>
      <h4>{user.balance}</h4>
    </div>
  );
}

export default LoginLogout;
