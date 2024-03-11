import React from "react";
import styles from "./EndGame.module.css";
export interface IEndGame {
  score: number;
  handleReview: () => void;
  handleRestart: () => void;
}
const endGame = ({ score, handleReview, handleRestart }: IEndGame) => {
  return (
    <div>
      {" "}
      <h1 className={styles.h1}>Your score is: {score} </h1>
      <button className={styles.button} onClick={handleRestart}>
        Try again{" "}
      </button>
      <button
        className={`${styles.button} ${styles.review}`}
        onClick={handleReview}
      >
        Review
      </button>
    </div>
  );
};

export default endGame;
