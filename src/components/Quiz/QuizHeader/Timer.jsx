import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { quiz } from "../../../reducers/quiz";

export const Timer = () => {
  const dispatch = useDispatch();
  const timer = useSelector((state) => state.quiz.timer);
  const stopTimer = useSelector((state) => state.quiz.stopTimer);

  useEffect(() => {
    const interval = setInterval(() => {
      if (stopTimer) {
        dispatch(quiz.actions.decrementTimer());
      }

      if (timer === 0) {
        clearInterval(interval);
        dispatch(quiz.actions.updateScore(-5));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch, timer]);

  return (
    <div className="timer">
      <span>{timer}</span>
    </div>
  );
};
