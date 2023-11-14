import "./ProgressBar.scss";

export const ProgressBar = ({ currentQuestion, totalQuestions }) => {
  // Make a calculation: 5 of 1 in 100%
  const calculateProgress = () => {
    return (currentQuestion / totalQuestions) * 100;
  };

  const currentStatus = calculateProgress();

  return (
    <div className="progressBar">
      <span className="progress" style={{ width: `${currentStatus}%` }}></span>
    </div>
  );
};
