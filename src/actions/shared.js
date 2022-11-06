import { getInitialData } from "../utils/api";
import { handleReceiveUsers } from "./users";
import { receiveQuestions } from "./questions";

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(handleReceiveUsers(users));
      dispatch(receiveQuestions(questions));
    });
  };
}
