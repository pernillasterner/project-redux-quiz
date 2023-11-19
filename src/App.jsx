import { useState } from "react";
import { useSelector } from "react-redux";
import { CurrentQuestion } from "./components/Quiz/QuizBody/CurrentQuestion/CurrentQuestion";
import { Welcome } from "./components/Welcome/Welcome";
import { Summery } from "./components/Summery/Summery";

export const App = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const quizOver = useSelector((state) => state.quiz.quizOver);

  return (
    <div className={`quizContainer ${!quizStarted || quizOver ? "end" : ""}`}>
      {!quizStarted && <Welcome onStartQuiz={() => setQuizStarted(true)} />}
      {quizStarted && !quizOver && <CurrentQuestion />}
      {quizOver && <Summery />}
    </div>
  );
};
