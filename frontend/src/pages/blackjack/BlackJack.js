import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/user-context";
import { useHistory } from "react-router-dom";
import validUser from "../../helpers/validUser";
import Card from "./card";
import "./Blackjack.css";
import jsonDeck from "./deck.json";
import { Button } from "react-bootstrap";
import updateBalance from "../../helpers/updateBalance";

const BlackJack = () => {
  const GameState = {
    BETTING: "betting",
    USER: "userTurn",
    DEALER: "dealerTurn",
    DONE: "done",
  };
};

export default BlackJack;
