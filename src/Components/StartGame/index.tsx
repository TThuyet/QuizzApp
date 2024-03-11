import React from "react";
import Button from "../BaseUI/Button";
import styles from "./StartGame.module.css";
export interface IStartGame {
  handleInGame: () => void;
}
const StartGame = ({ handleInGame }: IStartGame) => {
  return (
    <div className={styles.bg}>
      <h1 className={styles.h1}>Welcome to React Quizz Game!</h1>
      <button onClick={handleInGame} className={styles.button}>
        Start
      </button>
    </div>
  );
};

export default StartGame;
