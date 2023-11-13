import { useSelector, useDispatch } from "react-redux";
import { quiz } from "../reducers/quiz";

/* 
  Next Question Button: Implement a button to move to the 
  next question after the user selects an answer.
*/

export const CurrentQuestion = () => {
  const dispatch = useDispatch();
  // Getting the current question from the store
  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex]
  );

  const answer = useSelector(
    (state) => state.quiz.answers[state.quiz.currentQuestionIndex]
  );

  // Use currentQuestionIndex to get the current question number
  const currentQuestionIndex = useSelector(
    (state) => state.quiz.currentQuestionIndex
  );

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
    <>
      <p>
        Question: {currentQuestionIndex} / {question.options.length + 1}
      </p>
      <h2>Current question: {question.id}</h2>
      <p>{question.questionText}</p>

      <ul>
        {question.options.map((option, index) => (
          <li key={index}>
            <button onClick={() => handleSubmitAnswer(index)}>{option}</button>
          </li>
        ))}
      </ul>
      <p>Submit button</p>
      <button onClick={handleSubmit}>continue</button>

      {answer &&
        (answer.isCorrect ? (
          <p>You got this right!</p>
        ) : (
          <>
            <p>You got this wrong</p>
            <p>The correct answer is: {answer.answer}</p>
          </>
        ))}
    </>
  );
};
