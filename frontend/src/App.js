import TopBar from "./app_bar/TopBar";
import NavSwitch from "./pages/NavSwitch";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useCookies } from "react-cookie";
import jwt from "jsonwebtoken";
import dotenve from "dotenv";

function App() {
  dotenv.config();
  const [username, setUsername] = useState();
  const [balance, setBalance] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const privateKey = process.env.REACT_APP_JWT_PRIVATE_KEY;

  return (
    <div className="app">
      <div className="topBar">
        <TopBar />
      </div>
      <NavSwitch />
    </div>
  );
}

export default App;
