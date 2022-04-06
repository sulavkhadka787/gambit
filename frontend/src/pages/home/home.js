import React from "react";
import "./home.css";
import Logo from "./big_logo.png";
import { UserContext } from "../contexts/user-context";

const Home = () => {
  return (
    <div className="home">
      <img src={Logo} alt="" />
      <UserContext.Consumer>
        {({ user }) => user && <h1>{user.username}</h1>}
      </UserContext.Consumer>
    </div>
  );
};

export default Home;
