import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { addAnswerUser, addQuestionUser } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_QUESTION_ANSWER = "ADD_QUESTION_ANSWER";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

function addAnswerQuestion(author, qid, answer) {
  return {
    type: ADD_QUESTION_ANSWER,
    author,
    qid,
    answer,
  };
}

export function handleAddQuestion(firstOption, secondOption) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return saveQuestion(firstOption, secondOption, authedUser).then(
      (question) => {
        dispatch(addQuestion(question));
        dispatch(addQuestionUser(question));
      }
    );
  };
}

export function handleAddAnswer(authedUser, questionId, answer) {
  console.log("authedUser in handleAddAnswer= " + authedUser.id);
  console.log("questionId  in handleAddAnswer= " + questionId);
  console.log("answer  in handleAddAnswer= " + answer);
  return (dispatch) => {
    return saveQuestionAnswer(authedUser.id, questionId, answer).then(() => {
      dispatch(addAnswerQuestion(authedUser.id, questionId, answer));
      dispatch(addAnswerUser(authedUser.id, questionId, answer));
    });
  };
}
