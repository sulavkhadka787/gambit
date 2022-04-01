import TopBar from "./app_bar/TopBar";
import NavSwitch from "./pages/NavSwitch";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useCookies } from "react-cookie";
import jwt from "jsonwebtoken";

function App() {
  const [username, setUsername] = useState();
  const [balance, setBalance] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const privateKey = process.env.REACT_APP_JWT_PRIVATE_KEY;

  function appLogin(username, balance) {
    setUsername(username);
    setBalance(balance);
    const token = jwt.sign(
      { exp: Math.floor(Date.now() / 1000) + 60 * 60, username, balance },
      privateKey
    );
    setCookie("token", token, { maxAge: 3600 });
  }

  function appLogout() {
    removeCookie("token");
    setUsername("");
    setBalance(0);
    console.log("APP-JS-APP-LOGOUT():=>", cookies);
  }

  return (
    <div className="app">
      <div className="topBar">
        xxxx
        <TopBar onLogout={appLogout} privateKey={privateKey} />
      </div>
      <NavSwitch onLogin={appLogin} username={username} balance={balance} />
    </div>
  );
}

export default App;
