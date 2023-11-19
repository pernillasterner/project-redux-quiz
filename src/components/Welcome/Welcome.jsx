import "./Welcome.scss";

export const Welcome = ({ onStartQuiz }) => {
  return (
    <>
      <div className="squareLeft"></div>
      <div className="squareRight"></div>
      <div className="welcomeContainer">
        <div className="logoContainer">
          {" "}
          <span className="logo">Q</span>
        </div>
        <h3>Multi-step Quiz</h3>
        <h1>Welcome 😃</h1>
        <p className="instructions">
          Test your knowledge with our quiz. <br />
          Are you ready?
        </p>
        <button className="submit" onClick={onStartQuiz}>
          START QUIZ
        </button>
      </div>
    </>
  );
};
