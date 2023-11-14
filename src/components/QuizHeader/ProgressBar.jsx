export const ProgressBar = ({ currentQuestion, totalQuestions }) => {
  console.log(currentQuestion);

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
