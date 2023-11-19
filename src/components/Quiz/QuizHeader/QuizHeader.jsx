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
  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex]
  );

  const currentQuestionIndex = useSelector(
    (state) => state.quiz.currentQuestionIndex
  );

  return (
    <div className="quizHeader">
      <ProgressBar
        currentQuestion={currentQuestionIndex}
        totalQuestions={question.options.length}
      />
      <div className="counters">
        <Counter
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={question.options.length}
        />
        <Timer />
        <Score />
      </div>
    </div>
  );
};
