import { addQuestionUser } from "./users";
import { _saveQuestionAnswer, _saveQuestion } from "../utils/_DATA";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION_ANSWER = "ADD_QUESTION_ANSWER";
export const ADD_QUESTION = "ADD_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function addQuestionAnswer({ authedUser, qid, answer }) {
  return {
    type: ADD_QUESTION_ANSWER,
    authedUser,
    qid,
    answer,
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    }).then((question) => {
      dispatch(addQuestion(question));
      dispatch(addQuestionUser(authedUser, question.id));
    });
  };
}

export function handleAddQuestionAnswer({ authedUser, qid, answer }) {
  return (dispatch) => {
    dispatch(addQuestionAnswer({ authedUser, qid, answer }));
    return _saveQuestionAnswer({ authedUser, qid, answer }).catch((e) => {
      console.error("Error: " + e);
      alert("Error: " + e);
    });
  };
}
