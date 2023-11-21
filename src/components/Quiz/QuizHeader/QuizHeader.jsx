import { useSelector } from "react-redux";
import { Counter } from "./Counter";
import { ProgressBar } from "./ProgressBar";
import "./QuizHeader.scss";
import { Score } from "./Score";
import { Timer } from "./Timer";

/**
 * Score System: Implement scoring for correct and deduct points for incorrect answers.
 */

export const QuizHeader = () => {
  const currentQuestionIndex = useSelector(
    (state) => state.quiz.currentQuestionIndex
  );

  const questions = useSelector((state) => state.quiz.questions);

  return (
    <div className="quizHeader">
      <ProgressBar
        currentQuestion={currentQuestionIndex}
        totalQuestions={questions.length - 1}
      />
      <div className="counters">
        <Counter
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length - 1}
        />
        <Timer />
        <Score />
      </div>
    </div>
  );
};
