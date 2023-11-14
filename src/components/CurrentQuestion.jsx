import { useSelector, useDispatch } from "react-redux";
import { quiz } from "../reducers/quiz";

/* 
  Quiz Completion: Check if the quiz is over and 
  display a summary screen showing correct/incorrect answers.
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
    <>
      {!quizOver ? (
        <>
          <p>
            Question: {currentQuestionIndex + 1} / {question.options.length + 1}
          </p>
          <h2>Current question: {question.id}</h2>
          <p>{question.questionText}</p>

          <ul>
            {question.options.map((option, index) => (
              <li key={index}>
                <button onClick={() => handleSubmitAnswer(index)}>
                  {option}
                </button>
              </li>
            ))}
          </ul>

          <p>Submit button</p>
          <button onClick={handleSubmit}>Continue</button>

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
    </>
  );
};
