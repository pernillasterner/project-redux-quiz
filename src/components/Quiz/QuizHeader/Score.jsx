import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { quiz } from "../../../reducers/quiz";

export const Score = () => {
  const dispatch = useDispatch();
  const score = useSelector((state) => state.quiz.score);
  const answer = useSelector(
    (state) => state.quiz.answers[state.quiz.currentQuestionIndex]
  );
  const timer = useSelector((state) => state.quiz.timer);

  useEffect(() => {
    if (answer && timer !== 0) {
      // Update the score in the store
      dispatch(quiz.actions.updateScore(answer.isCorrect ? 10 : -5));
    }
  }, [answer, dispatch]);

  return (
    <div className="score">
      <span>⭐️ {score}</span>
    </div>
  );
};
