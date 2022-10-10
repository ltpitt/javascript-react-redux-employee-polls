// export function _saveQuestion (question) {
//     return new Promise((resolve, reject) => {
//       if (!question.optionOneText || !question.optionTwoText || !question.author) {
//         reject("Please provide optionOneText, optionTwoText, and author");
//       }

//       const formattedQuestion = formatQuestion(question)
//       setTimeout(() => {
//         questions = {
//           ...questions,
//           [formattedQuestion.id]: formattedQuestion
//         }

//         resolve(formattedQuestion)
//       }, 1000)
//     })
//   }

import { _saveQuestion, _saveQuestionAnswer } from "./_DATA";

describe("data", () => {
  // Tests for _saveQuestion

  it("will save the given valid question", async () => {
    const validMockQuestion = {
      author: "sarahedo",
      optionOneText: "Option 1 Test",
      optionTwoText: "Option 2 Test",
    };

    const result = await _saveQuestion(validMockQuestion);

    expect(result.author).toEqual(validMockQuestion.author);
    expect(result.optionOne.text).toEqual(validMockQuestion.optionOneText);
    expect(result.optionTwo.text).toEqual(validMockQuestion.optionTwoText);
    expect(result.timestamp.toString().length).toEqual(13);
    expect(result).toHaveProperty("id");
    expect(result.id.toString().length).toBeGreaterThan(1);
  });

  it("will not save the given invalid question and will reject request", async () => {
    const invalidMockQuestion = {
      name: "Test name",
      option1: "Option 1 Test",
      option2: "Option 2 Test",
    };

    await expect(_saveQuestion(invalidMockQuestion)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });

  // Tests for _saveQuestionAnswer
  it("will return true given correctly formatted data", async () => {
    const validMockQuestionAnswer = {
      authedUser: "sarahedo",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionTwo",
    };

    const result = await _saveQuestionAnswer(validMockQuestionAnswer);
    expect(result).toEqual(true);
  });

  it("will return error given incorrectly formatted data", async () => {
    const invalidMockQuestionAnswer = {
      some: "having",
      wrong: "random",
      properties: "values",
    };

    await expect(
      _saveQuestionAnswer(invalidMockQuestionAnswer)
    ).rejects.toEqual("Please provide authedUser, qid, and answer");
  });
});
