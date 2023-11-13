import { useSelector, useDispatch } from "react-redux";
import { quiz } from "../reducers/quiz";

export const CurrentQuestion = () => {
  const dispatch = useDispatch();
  // Getting the current question from the store
  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex]
  );

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }

  /**
   * returns a payload with questionId and answerIndex
   */
  const handleSubmitAnswer = (answerIndex) => {
    // Use the quiz action to handle the submit answer
    dispatch(
      quiz.actions.submitAnswer({
        questionId: question.id,
        answerIndex,
      })
    );
  };

  return (
    <>
      <h2>Current question: {question.id}</h2>
      <p>{question.questionText}</p>

      <ul>
        {question.options.map((option, index) => (
          <li key={index}>
            <button onClick={() => handleSubmitAnswer(index)}>{option}</button>
          </li>
        ))}
      </ul>
    </>
  );
};
