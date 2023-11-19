import { useSelector } from "react-redux";
import "./Summery.scss";

export const Summery = ({ answers }) => {
  const score = useSelector((state) => state.quiz.score);
  let scoreText = "";

  switch (score) {
    case score > 10:
      scoreText = "Well done! 👏";
      break;
    case score < 0 && score < 10:
      scoreText = "Keep it up! 🚀";
      break;
    default:
      scoreText = "Better luck next time! 👻";
  }

  const handleSubmit = () => {
    console.log("New Quiz!");
  };

  return (
    <>
      <div className="squareLeft"></div>
      <div className="squareRight"></div>
      <div className="summeryContainer">
        <p className="score">⭐️ {score}</p>
        <h2 className="scoreText">{scoreText}</h2>
        <p className="subTitle">
          You have completed the quiz. <br /> Let's review your score.
        </p>

        {/* check how many isCorrect there is. */}

        <div className="numAnswers">
          <p>Correct answers: 10</p>
          <p>Wrong answers: 4</p>
        </div>

        <div className="detailsContainer">
          <h4>Details:</h4>

          {answers.map((a, index) => (
            <>
              <p key={index}>
                <strong>Question: {a.questionId}</strong> -{" "}
                {a.question.questionText}
              </p>
              <p>Your answer: {a.answer}</p>
              <p>
                Correct answer:{" "}
                {a.question.options[a.question.correctAnswerIndex]}{" "}
              </p>
              <p>Feedback: Great job! You got this one right</p>
              <br />
            </>
          ))}
        </div>
        <button className="submit" onClick={handleSubmit}>
          new challange
        </button>
      </div>
    </>
  );
};
