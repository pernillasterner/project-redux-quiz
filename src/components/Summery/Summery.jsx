import { useSelector, useDispatch } from "react-redux";
import "./Summery.scss";
import { quiz } from "../../reducers/quiz";

export const Summery = () => {
  const dispatch = useDispatch();
  const score = useSelector((state) => state.quiz.score);
  const answers = useSelector((state) => state.quiz.answers);
  const totalTime = useSelector((state) => state.quiz.totalTime);
  let scoreText = "";
  let correctAnswer = 0;
  let incorrectAnswer = 0;

  if (score > 10 && score <= 15) {
    scoreText = "Well done! 👏";
  } else if (score >= 0 && score <= 10) {
    scoreText = "Keep it up! 🚀";
  } else if (score > 15) {
    scoreText = "Wow, you really know things about interior design! 🚀";
  } else {
    scoreText = "Better luck next time! 👻";
  }

  const handleRestart = () => {
    dispatch(quiz.actions.restart());
  };

  answers.forEach((answer) => {
    if (answer.isCorrect) {
      correctAnswer++;
    } else {
      incorrectAnswer++;
    }
  });

  return (
    <>
      <div className="squareLeft"></div>
      <div className="squareRight"></div>
      <div className="summeryContainer">
        <p className="score">⭐️ {score}</p>
        <p className="totalTime">
          It took you
          {totalTime && totalTime < 60
            ? ` ${totalTime} seconds `
            : ` ${totalTime} minutes `}
          to answer all the questions.
        </p>
        <h2 className="scoreText">{scoreText}</h2>
        <p className="subTitle">
          You have completed the quiz. <br /> Let's review your score.
        </p>

        {/* check how many isCorrect there is. */}

        <div className="numAnswers">
          <p>Correct answers: {correctAnswer}</p>
          <p>Wrong answers: {incorrectAnswer}</p>
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
        <button className="submit" onClick={handleRestart}>
          restart quiz
        </button>
      </div>
    </>
  );
};
