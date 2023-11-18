import { useSelector, useDispatch } from "react-redux";
import { quiz } from "../reducers/quiz";
import "./CurrentQuestion.scss";
import { QuizHeader } from "./QuizHeader/QuizHeader";
import { Summery } from "./Summery";
import { Welcome } from "./QuizHeader/Welcome";

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
  // console.log(answers);
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
  const handleSubmitAnswer = (answerIndex, isCorrect) => {
    // console.log(answerIndex);
    // console.log(isCorrect);

    // If questionId exists return error message
    if (answers.some((answer) => answer.questionId === question.id)) {
      console.log("Already answered this question");
      return;
    }

    // Use the quiz action to handle the submit answer
    dispatch(
      quiz.actions.submitAnswer({
        questionId: question.id,
        answerIndex,
        isCorrect,
        answer: question.options[answerIndex],
      })
    );

    // Update store with new score
    dispatch(quiz.actions.updateScore(isCorrect ? 10 : -5));
  };

  // By clicking on the submit I should add + to question index? in the handler
  const handleSubmit = () => {
    dispatch(quiz.actions.goToNextQuestion());
  };

  return (
    <div className="quizContainer">
      {/* <Welcome /> */}

      {!quizOver ? (
        <>
          <QuizHeader />

          <div className="checkAnswerContainer">
            {!answer && (
              <h2 className="questionText">{question.questionText}</h2>
            )}
            {answer &&
              (answer.isCorrect ? (
                <>
                  <h2>🎉 Congratulations!</h2>
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
          <ul className="questionContainer">
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
        <>{quizOver && <Summery answers={answers} />}</>
      )}
    </div>
  );
};
