import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export const Score = () => {
  const [score, setScore] = useState(0);

  const answer = useSelector(
    (state) => state.quiz.answers[state.quiz.currentQuestionIndex]
  );

  useEffect(() => {
    if (answer) {
      switch (answer.isCorrect) {
        case true:
          setScore(score + 10);
          break;
        case false:
          setScore(score - 5);
          break;
        default:
          break;
      }
    }
  }, [answer]);

  return (
    <div className="score">
      <span>⭐️ {score}</span>
    </div>
  );
};
