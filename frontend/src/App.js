import TopBar from "./app_bar/TopBar";
import NavRouter from "./pages/NavRouter";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { UserContext } from "./pages/contexts/user-context.js";
import { AuthContext } from "./pages/contexts/auth-context";
import axios from "axios";

function App() {
  const [cookie, setCookie, removeCookie] = useCookies(["AUTH-TOKEN"]);
  const [user, setUser] = useState({});
  const [authToken, setAuthToken] = useState();

  useEffect(() => {
    async function getUser() {
      const res = await axios.get("/auth/user");
      setUser({
        username: res.data.username,
        balance: res.data.balance,
      });
    }

    if (!(JSON.stringify(cookie) === "{}") && cookie["AUTH-TOKEN"].length > 0) {
      getUser();
    } else {
      setUser({});
    }

    return () => {};
  }, [cookie]);

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
