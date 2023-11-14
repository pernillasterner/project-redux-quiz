import { useSelector } from "react-redux";
import { Counter } from "./Counter";
import { ProgressBar } from "./ProgressBar";
import "./QuizHeader.scss";

export const QuizHeader = () => {
  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex]
  );

  const currentQuestionIndex = useSelector(
    (state) => state.quiz.currentQuestionIndex
  );

  return (
    <>
      <ProgressBar
        currentQuestion={currentQuestionIndex}
        totalQuestions={question.options.length}
      />
      <Counter
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={question.options.length}
      />
    </>
  );
};
