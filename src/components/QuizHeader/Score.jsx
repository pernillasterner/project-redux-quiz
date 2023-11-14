import { useState } from "react";
import { useSelector } from "react-redux";

export const Score = () => {
  let score = 0;
  const answer = useSelector(
    (state) => state.quiz.answers[state.quiz.currentQuestionIndex]
  );
  // console.log(answer.isCorrect);
  if (answer) {
    console.log("answer");
  } else {
    console.log("no answer");
  }
  // if (answer.length > 0 && answer.isCorrect) {
  //   score += 10;
  // } else {
  //   console.log("else");
  // }

  return (
    <div className="score">
      <span>⭐️ {score}</span>
    </div>
  );
};
