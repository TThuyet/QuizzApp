import React, { useEffect, useState } from "react";
import styles from "./InGame.module.css";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
export interface IInGame {
  handleRestart: () => void;
  listQuestions: {
    id: string;
    question_content: string;
    answers: {
      answer_content: string;
      correct: boolean;
    }[];
  }[];

  handlelistChoice: (value: string[]) => void;
  // listAnswerCorrect: () => string[];
  statusReview: boolean;
  // yourAnswer: string[];
  listReviewAnswer: () => {
    [key: number]: string;
  }[];
}

const InGame = ({
  handleRestart,
  listQuestions,
  handlelistChoice,
  statusReview,
  listReviewAnswer,
}: IInGame) => {
  const [indexList, setIndexList] = useState(0);
  const [choices, setChoices] = useState([""]);
  const handleAnswer = (e: any) => {
    setChoices((prev) => {
      const newA: string[] = [...prev];
      newA[indexList] = e.target.value;
      return newA;
    });
  };

  const handleSubmit = () => {
    const confirmSubmit = window.confirm("Do you want to submit answers?");
    if (confirmSubmit) {
      handlelistChoice(choices);
    }
  };

  console.log(choices, "aaaaa");
  console.log(listReviewAnswer(), "bbbb");

  return (
    <div className={styles.ingame}>
      <div>
        <button
          className={`${indexList === 0 && styles.disable} ${styles.button} ${
            styles.btnPrev
          }`}
          onClick={() =>
            setIndexList((prev: number) => {
              let index: number = prev;
              if (index > 0) {
                index -= 1;
              } else {
                index = 0;
              }
              return index;
            })
          }
        >
          Previous
        </button>
        <button
          className={`${
            indexList === listQuestions.length - 1 && styles.disable
          } ${styles.button}`}
          onClick={() => {
            setIndexList((prev) => {
              let index: number = prev;
              if (index < listQuestions.length - 1) {
                index += 1;
              } else if (index >= listQuestions.length) {
                index = listQuestions.length - 1;
              }
              return index;
            });
          }}
        >
          Next
        </button>

        {statusReview ? (
          <button
            className={`${styles.button} ${styles.restart}`}
            onClick={handleRestart}
          >
            Restart
          </button>
        ) : (
          <button
            className={`${
              indexList === listQuestions.length - 1 && styles.vis
            } ${styles.button} ${styles.btnSubmit}`}
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
      <div>
        <div className={styles.question}>
          {statusReview ? (
            ""
          ) : (
            <div className={styles.countdown}>
              <CountdownCircleTimer
                isPlaying
                duration={90}
                colors={"#004777"}
                size={80}
                // colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                // colorsTime={[7, 5, 2, 0]}
              >
                {({ remainingTime }: any) => {
                  useEffect(() => {
                    remainingTime === 0 && handleSubmit();
                  }, [remainingTime]);
                  const minutes = Math.floor(remainingTime / 60);
                  const seconds = remainingTime % 60;

                  return `${minutes}:${seconds}`;
                }}
              </CountdownCircleTimer>
            </div>
          )}
          <p className={styles.questionCount}>
            Question{" "}
            <strong style={{ color: `rgba(67 56 202,0.1);` }}>
              {indexList + 1}
            </strong>
            /{listQuestions.length}
          </p>
          <p className={styles.questionContent}>
            {" "}
            {listQuestions[indexList].question_content}
          </p>
        </div>
        {statusReview ? (
          <ul className="answers">
            {listQuestions[indexList].answers.map((answer, index) => (
              <li
                className={styles.li}
                key={listQuestions[indexList].id + index}
              >
                <label
                  htmlFor={index + ""}
                  className={` ${styles.label}
                  ${
                    answer.answer_content ===
                      listReviewAnswer()[1][indexList] && styles.inputChoice
                  }

                  ${
                    answer.answer_content ===
                      listReviewAnswer()[0][indexList] && styles.inputCorrect
                  }`}
                >
                  <input
                    type="checkbox"
                    className={`${styles.input}`}
                    value={answer.answer_content}
                    checked={
                      answer.answer_content ===
                        listReviewAnswer()[1][indexList] ||
                      answer.answer_content === listReviewAnswer()[0][indexList]
                        ? true
                        : false
                    }
                    readOnly
                  />
                  {index + 1}. {answer.answer_content}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <ul className={styles.answers}>
            {listQuestions[indexList].answers.map((answer, index) => (
              <li
                // onClick={}
                key={listQuestions[indexList].id + index}
                className={styles.li}
              >
                {" "}
                <label
                  className={`${
                    answer.answer_content === choices[indexList] &&
                    styles.inputChecked
                  } ${styles.label}`}
                  htmlFor={index + ""}
                >
                  <input
                    className={`${styles.input}`}
                    type="radio"
                    name={"answer" + listQuestions[indexList].id}
                    id={index + ""}
                    onChange={handleAnswer}
                    value={answer.answer_content}
                    checked={
                      answer.answer_content === choices[indexList]
                        ? true
                        : false
                    }
                  />
                  {index + 1}. {answer.answer_content}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InGame;
