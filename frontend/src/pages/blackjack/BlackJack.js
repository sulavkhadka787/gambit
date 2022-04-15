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
  //enum
  const Gamestate = {
    BETTING: "betting",
    USER: "userTurn",
    DEALER: "dealerTurn",
    DONE: "done",
  };

  //Variables
  const data = JSON.parse(JSON.stringify(jsonDeck.cards));
  const faceCards = ["K", "Q", "J"];
  const { user, setUser } = useUser();

  const [dealerValue, setDealerValue] = useState(0);
  const [playerValue, setPlayerValue] = useState(0);
  const [deck, setDeck] = useState(data);
  const [betAmount, setBetAmount] = useState(1);
  const [gamestate, setGamestate] = useState(Gamestate.BETTING);
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [winner, setWinner] = useState("");

  //functions
  useEffect(() => {
    if (betAmount < 0) {
      setBetAmount(-1 * Math.trunc(betAmount));
    } else if (betAmount > user.balance && gamestate === Gamestate.BETTING) {
      setBetAmount(Math.trunc(user.balance));
    }
    return () => {};
  }, [betAmount, user]);

  function pickCards(count) {
    const cards = [];
    for (let i = 0; i < count; i++) {
      let index = Math.floor(Math.random() * deck.length);
      let card = deck[index];
      card["hidden"] = false;
      let newDeck = deck;
      newDeck.splice(index, 1);
      setDeck(newDeck);
      cards.push(card);
    }
    return cards;
  }

  function calculateValue(cards) {
    let value = 0;
    let aces = 0;

    cards.forEach((card) => {
      if (card.value === "A") {
        aces += 1;
      } else {
        value += getCardValue(card.value);
      }
    });

    if (value + aces >= 21 || aces === 0) {
      return value + aces;
    }

    while (value + 11 <= 21 && aces === 1) {
      aces -= 1;
      value += 1;
    }
    return value + aces;
  }

  function getCardValue(value) {
    if (faceCards.includes(value)) {
      return 10;
    } else {
      return parseInt(value);
    }
  }

  async function dealCards() {
    setGamestate(Gamestate.USER);
    const updatedUser = await updateBalance(-1 * betAmount);
    //check user and setuser
    console.log("UPDATED-USER-SETUSER()=>>", updatedUser);
    setUser(updatedUser);
    const pCards = pickCards(2);
    setPlayerCards(pCards);
    setPlayerValue(calculateValue(pCards));
    let dCards = pickCards(2);
    dCards[1].hidden = true;
    setDealerCards(dCards);
    setDealerValue(calculateValue([dCards[0]]));
  }
};

export default BlackJack;
