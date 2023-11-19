import { useState } from "react";
import { CurrentQuestion } from "./components/Quiz/CurrentQuestion/CurrentQuestion";
import { Welcome } from "./components/Welcome/Welcome";

export const App = () => {
  const [quizStarted, setQuizStarted] = useState(false);

  return (
    <>
      {quizStarted ? (
        <CurrentQuestion />
      ) : (
        <Welcome onStartQuiz={() => setQuizStarted(true)} />
      )}
    </>
  );
};
