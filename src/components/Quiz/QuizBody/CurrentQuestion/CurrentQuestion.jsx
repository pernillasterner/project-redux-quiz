import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { quiz } from "../../../../reducers/quiz";
import "./CurrentQuestion.scss";
import { QuizHeader } from "../../QuizHeader/QuizHeader";
import { AnswerStatus } from "../AnswerStatus/AnswerStatus";

export const CurrentQuestion = () => {
  const dispatch = useDispatch();

  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex]
  );
  const answer = useSelector(
    (state) => state.quiz.answers[state.quiz.currentQuestionIndex]
  );
  const answers = useSelector((state) => state.quiz.answers);
  const correctAnswerIndex = question.correctAnswerIndex;
  const timer = useSelector((state) => state.quiz.timer);

  // State to track the index of the clicked button
  const [clickedButtonIndex, setClickedButtonIndex] = useState(null);

  const handleSubmitAnswer = (answerIndex, isCorrect) => {
    if (answers.some((answer) => answer.questionId === question.id)) {
      console.log("Already answered this question");
      return;
    }

    dispatch(quiz.actions.stopTimer());
    // change background color
    setClickedButtonIndex(answerIndex);

    dispatch(
      quiz.actions.submitAnswer({
        questionId: question.id,
        answerIndex,
        isCorrect,
        answer: question.options[answerIndex],
        score: 0,
        timer,
      })
    );
  };

  const handleSubmit = () => {
    let noAnswerResponse = document.querySelector(".noAnswer");
    if (!answer) {
      noAnswerResponse.innerHTML =
        "You need to answer this question before continuing";
    } else {
      console.log(timer);
      console.log("reset");
      noAnswerResponse.innerHTML = "";
      dispatch(quiz.actions.updateTotalTime(timer));
      dispatch(quiz.actions.resetTimer());
      dispatch(quiz.actions.stopTimer());
      dispatch(quiz.actions.goToNextQuestion());
    }

    // reset the colors
    setClickedButtonIndex(null);
  };

  const getButtonStyle = (buttonIndex) => {
    if (clickedButtonIndex !== null && correctAnswerIndex === buttonIndex) {
      return "correct";
    } else if (
      clickedButtonIndex === buttonIndex &&
      correctAnswerIndex !== buttonIndex
    ) {
      return "incorrect";
    } else {
      return "";
    }
  };

  return (
    <>
      <QuizHeader />
      <div className="quizBody">
        <div className="headerContainer">
          {question.image && (
            <img
              src={question.image}
              alt={`Question ${question.id}`}
              className="questionImage"
            />
          )}
          {!answer ? (
            <>
              {timer === 0 ? (
                <>
                  <h2 className="questionText" style={{ textAlign: "center" }}>
                    Oops! Time is up.
                  </h2>
                  <p> What would you guess the correct answer is?</p>
                </>
              ) : (
                <h2 className="questionText">{question.questionText}</h2>
              )}
            </>
          ) : (
            <AnswerStatus
              correctAnswer={question.options[correctAnswerIndex]}
              isCorrect={answer.isCorrect}
            />
          )}
        </div>

        <ul className="questionContainer">
          {question.options.map((option, index) => (
            <li key={index}>
              <button
                className={getButtonStyle(index)}
                onClick={() => handleSubmitAnswer(index)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
        <button className="submit" onClick={handleSubmit}>
          continue
        </button>
        <p className="noAnswer"></p>
      </div>
    </>
  );
};
