import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { quiz } from "../../../../reducers/quiz";
import "./CurrentQuestion.scss";
import { QuizHeader } from "../../QuizHeader/QuizHeader";
import { Summery } from "../../../Summery/Summery";
import { AnswerStatus } from "../AnswerStatus/AnswerStatus";

/**
 * När jag klickar på ett svarsalternativ så ska följande ske
 *
 * 1. Kolla om svaret är rätt eller fel. ✅
 * 2. Ge ut rätt svar ✅
 * 3. Färgen på knapparna ska ändras beroende på om svaret är rätt eller fel.✅
 * 4. Uppdatera score beroende på svaret. Det ska finnas en counter också
 */

export const CurrentQuestion = () => {
  const dispatch = useDispatch();

  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex]
  );
  const answer = useSelector(
    (state) => state.quiz.answers[state.quiz.currentQuestionIndex]
  );
  const answers = useSelector((state) => state.quiz.answers);
  const quizOver = useSelector((state) => state.quiz.quizOver);
  const correctAnswerIndex = question.correctAnswerIndex;

  // State to track the index of the clicked button
  const [clickedButtonIndex, setClickedButtonIndex] = useState(null);

  const handleSubmitAnswer = (answerIndex, isCorrect) => {
    if (answers.some((answer) => answer.questionId === question.id)) {
      console.log("Already answered this question");
      return;
    }

    // change background color
    setClickedButtonIndex(answerIndex);

    dispatch(
      quiz.actions.submitAnswer({
        questionId: question.id,
        answerIndex,
        isCorrect,
        answer: question.options[answerIndex],
      })
    );
  };

  const handleSubmit = () => {
    dispatch(quiz.actions.goToNextQuestion());
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
      {!quizOver ? (
        <>
          <QuizHeader />
          <div className="quizBody">
            <div className="headerContainer">
              {!answer ? (
                <h2 className="questionText">{question.questionText}</h2>
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
          </div>
        </>
      ) : (
        <>{quizOver && <Summery answers={answers} />}</>
      )}
    </>
  );
};
