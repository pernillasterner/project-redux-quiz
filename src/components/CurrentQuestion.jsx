import { useSelector } from "react-redux";

export const CurrentQuestion = () => {
  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex]
  );

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }

  const handleClick = (event) => {
    // TODO send the captureSquare action
  };

  return (
    <>
      <h2>Current question: {question.id}</h2>
      <p>{question.questionText}</p>
    </>
  );
};
