import { useState } from "react";
import { CurrentQuestion } from "./components/Quiz/QuizBody/CurrentQuestion/CurrentQuestion";
import { Welcome } from "./components/Welcome/Welcome";

export const App = () => {
  const [quizStarted, setQuizStarted] = useState(false);

  return (
    <div className="quizContainer">
      {quizStarted ? (
        <CurrentQuestion />
      ) : (
        <Welcome onStartQuiz={() => setQuizStarted(true)} />
      )}
    </div>
  );
};
