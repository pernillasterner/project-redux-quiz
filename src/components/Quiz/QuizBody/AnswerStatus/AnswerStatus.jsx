import "./AnswerStatus.scss";

export const AnswerStatus = ({ correctAnswer, isCorrect }) => {
  return (
    <>
      <h2>{isCorrect ? "🎉 Congratulations!" : "😬 Oops, wrong answer."}</h2>
      <p>
        Right answer is {"\n"} {correctAnswer}
      </p>
    </>
  );
};
