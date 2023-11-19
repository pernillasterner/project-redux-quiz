export const ProgressBar = ({ currentQuestion, totalQuestions }) => {
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
