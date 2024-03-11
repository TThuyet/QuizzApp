import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import StartGame from "./Components/StartGame";
import EndGame from "./Components/EndGame";
import InGame from "./Components/InGame";

function App() {
  const [gameStatus, setGameStatus] = useState<
    "startgame" | "ingame" | "endgame"
  >("startgame");
  const [score, setScore] = useState(0);
  const [yourAnswer, setYourAnswer] = useState<string[]>([]);
  const [statusReview, setStatusReview] = useState(false);

  const myQuestions = [
    {
      id: "1",
      question_content: "React is mainly used for building ___.",
      answers: [
        {
          answer_content: "Database",
          correct: false,
        },
        {
          answer_content: "User interface",
          correct: true,
        },
        {
          answer_content: "Design Platform",
          correct: false,
        },
      ],
    },
    {
      id: "2",
      question_content: "The lifecycle methods are mainly used for ___.",
      answers: [
        {
          answer_content: "keeping track of event history",
          correct: false,
        },
        {
          answer_content: "enhancing components",
          correct: false,
        },
        {
          answer_content: "freeing up resources",
          correct: false,
        },
        {
          answer_content: "none of the above",
          correct: true,
        },
      ],
    },
    {
      id: "3",
      question_content:
        "___ can be done while multiple elements need to be returned from a component.",
      answers: [
        {
          answer_content: "Abstraction",
          correct: false,
        },
        {
          answer_content: "Insulation",
          correct: false,
        },
        {
          answer_content: "Wrapping",
          correct: true,
        },
      ],
    },
    {
      id: "4",
      question_content:
        "Which is the right way of accessing a function fetch() from an h1 element in JSX?",
      answers: [
        {
          answer_content: "<h1>{fetch()}</h1>",
          correct: true,
        },
        {
          answer_content: "<h1>${fetch()}</h1>",
          correct: false,
        },
        {
          answer_content: "<h1>{fetch}</h1>",
          correct: false,
        },
        {
          answer_content: "<h1>${fetch}</h1>",
          correct: false,
        },
      ],
    },
    {
      id: "5",
      question_content:
        "Which of the following methods in a React Component should be overridden to stop the component from updating?",
      answers: [
        {
          answer_content: "willComponentUpdate",
          correct: false,
        },
        {
          answer_content: "shouldComponentUpdate",
          correct: true,
        },
      ],
    },
  ];

  const listAnswerCorrect = () => {
    const rs = myQuestions.map((question) => {
      return question.answers.filter((answer) => answer.correct);
    });

    const result = rs.flat().map((answer) => answer.answer_content);
    return result;
  };
  // var yourAnswer: string[] = new Array<string>(4).fill("");

  const handlelistChoice = (value: string[]) => {
    setYourAnswer((prev) => [...prev, ...value]);

    const result = listAnswerCorrect();
    let count = 0;
    for (let i = 0; i < result.length; i++) {
      if (result[i] === value[i]) {
        count++;
      }
    }

    setScore(count);
    setGameStatus("endgame");
  };

  const listReviewAnswer = () => {
    const ob1 = listAnswerCorrect().reduce(
      (acc: { [key: number]: string }, item: string, index: number) => {
        acc[index] = item;
        return acc;
      },
      {}
    );
    console.log(yourAnswer);

    const ob2 = yourAnswer.reduce(
      (acc: { [key: number]: string }, item, index) => {
        acc[index] = item;
        return acc;
      },
      {}
    );
    const result: { [key: number]: string }[] = [];
    return result.concat(ob1, ob2);
  };

  const renderGame = () => {
    switch (gameStatus) {
      case "startgame":
        return <StartGame handleInGame={() => setGameStatus("ingame")} />;
      case "ingame":
        return (
          <InGame
            handleRestart={() => (
              setGameStatus("startgame"),
              setStatusReview(false),
              setYourAnswer([])
            )}
            listQuestions={myQuestions}
            handlelistChoice={handlelistChoice}
            statusReview={statusReview}
            listReviewAnswer={listReviewAnswer}
          />
        );
      case "endgame":
        return (
          <EndGame
            score={score}
            handleReview={() => (
              setGameStatus("ingame"), setStatusReview(true)
            )}
            handleRestart={() => (
              setGameStatus("startgame"),
              setStatusReview(false),
              setYourAnswer([])
              // setYourAnswer([])
            )}
          />
        );
    }
  };
  return (
    <>
      {/* <h1>Header</h1> */}
      {/* 
      components :startGame, inGame, end Game
    */}

      {renderGame()}
    </>
  );
}

export default App;
