import { useSelector, useDispatch } from "react-redux";
import { quiz } from "../reducers/quiz";
// import AnswerStatus from "./AnswerStatus";
import "./CurrentQuestion.scss";
import { ProgressBar } from "./ProgressBar";

/**
 * Highlight Correct Answer (Stretch Goal): Implement highlighting the correct
 * answer after the user makes a selection.
 */

export const CurrentQuestion = () => {
  const dispatch = useDispatch();
  // Getting the current question from the store
  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex]
  );
  console.log(question.id);
  const answer = useSelector(
    (state) => state.quiz.answers[state.quiz.currentQuestionIndex]
  );

  const answers = useSelector((state) => state.quiz.answers);
  console.log(answers);
  // Use currentQuestionIndex to get the current question number
  const currentQuestionIndex = useSelector(
    (state) => state.quiz.currentQuestionIndex
  );

  // return true or false
  const quizOver = useSelector((state) => state.quiz.quizOver);

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }

  /**
   * returns a payload with questionId and answerIndex
   */
  const handleSubmitAnswer = (answerIndex) => {
    // Use dispatch to send the answer to the store
    // Use the quiz action to handle the submit answer
    dispatch(
      quiz.actions.submitAnswer({
        questionId: question.id,
        answerIndex,
      })
    );
  };

  // By clicking on the submit I should add + to question index? in the handler
  const handleSubmit = () => {
    dispatch(quiz.actions.goToNextQuestion());
  };

  return (
    <div className="quizContainer">
      {!quizOver ? (
        <>
          {/* Need to send in questionId */}
          <ProgressBar
            currentQuestion={question.id}
            totalQuestions={question.options.length + 1}
          />
          <div className="counter">
            <span className={currentQuestionIndex === 0 ? "active" : ""}>
              {currentQuestionIndex + 1}
            </span>
            <span> / {question.options.length + 1}</span>
          </div>
          {!answer && <h2>{question.questionText}</h2>}

          {/* TODO: Put in a seperate container */}
          <div className="checkAnswerContainer">
            {answer &&
              (answer.isCorrect ? (
                <>
                  <h4>🎉 Congratulations!</h4>
                  <p>
                    Right answer is: <br /> {answer.answer}
                  </p>
                </>
              ) : (
                <>
                  <h4>😬 Oops, wrong answer.</h4>
                  <p>
                    Right answer is: <br /> {answer.answer}
                  </p>
                </>
              ))}
          </div>
          {/* until this.... */}
          <ul>
            {question.options.map((option, index) => (
              <li key={index}>
                <button onClick={() => handleSubmitAnswer(index)}>
                  {option}
                </button>
              </li>
            ))}
          </ul>
          <button className="submit" onClick={handleSubmit}>
            continue
          </button>
        </>
      ) : (
        <>
          <p>Your answers</p>
          <ul>
            {answers.map((a, index) => (
              <li key={index}>{a.answer}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
