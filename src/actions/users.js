export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_QUESTION_USER = "ADD_QUESTION_USER";
export const ADD_QUESTION_ANSWER_USER = "ADD_QUESTION_ANSWER_USER";

export function handleReceiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function addQuestionAnswerUser(authedUser, qid, answer) {
  return {
    type: ADD_QUESTION_ANSWER_USER,
    authedUser,
    qid,
    answer,
  };
}

export function addQuestionUser({ author, id }) {
  return {
    type: ADD_QUESTION_USER,
    author,
    qid: id,
  };
}
