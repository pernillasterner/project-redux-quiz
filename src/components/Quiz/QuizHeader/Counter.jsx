export const Counter = ({ currentQuestionIndex, totalQuestions }) => {
  return (
    <div className="counter">
      <span className={currentQuestionIndex === 0 ? "active" : ""}>
        {currentQuestionIndex + 1}
      </span>
      <span> / {totalQuestions + 1}</span>
    </div>
  );
};
