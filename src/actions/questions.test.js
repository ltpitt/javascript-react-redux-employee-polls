import {
  receiveQuestions,
  addQuestion,
  addQuestionAnswer,
  handleAddQuestion,
  handleAddQuestionAnswer,
  RECEIVE_QUESTIONS,
  ADD_QUESTION_ANSWER,
  ADD_QUESTION
} from './questions';

// Mock the API calls
jest.mock('../utils/_DATA', () => ({
  _saveQuestion: jest.fn(),
  _saveQuestionAnswer: jest.fn()
}));

import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA';

describe('questions actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('receiveQuestions', () => {
    it('should create an action to receive questions', () => {
      const questions = {
        'q1': { id: 'q1', author: 'user1' },
        'q2': { id: 'q2', author: 'user2' }
      };
      const expectedAction = {
        type: RECEIVE_QUESTIONS,
        questions
      };
      expect(receiveQuestions(questions)).toEqual(expectedAction);
    });
  });

  describe('addQuestion', () => {
    it('should create an action to add a question', () => {
      const question = { id: 'q1', author: 'user1', optionOne: { text: 'Option 1' } };
      const expectedAction = {
        type: ADD_QUESTION,
        question
      };
      expect(addQuestion(question)).toEqual(expectedAction);
    });
  });

  describe('addQuestionAnswer', () => {
    it('should create an action to add a question answer', () => {
      const answerData = {
        authedUser: 'sarahedo',
        qid: 'q1',
        answer: 'optionOne'
      };
      const expectedAction = {
        type: ADD_QUESTION_ANSWER,
        authedUser: 'sarahedo',
        qid: 'q1',
        answer: 'optionOne'
      };
      expect(addQuestionAnswer(answerData)).toEqual(expectedAction);
    });
  });

  describe('handleAddQuestion', () => {
    it('should handle adding a new question successfully', async () => {
      const mockQuestion = {
        id: 'q1',
        author: 'sarahedo',
        optionOne: { text: 'Option 1', votes: [] },
        optionTwo: { text: 'Option 2', votes: [] },
        timestamp: Date.now()
      };

      _saveQuestion.mockResolvedValue(mockQuestion);

      const mockDispatch = jest.fn();
      const mockGetState = jest.fn(() => ({
        authedUser: 'sarahedo'
      }));

      const thunk = handleAddQuestion('Option 1', 'Option 2');
      await thunk(mockDispatch, mockGetState);

      expect(_saveQuestion).toHaveBeenCalledWith({
        optionOneText: 'Option 1',
        optionTwoText: 'Option 2',
        author: 'sarahedo'
      });

      expect(mockDispatch).toHaveBeenCalledWith(addQuestion(mockQuestion));
    });

    it('should handle API errors when adding a question', async () => {
      _saveQuestion.mockRejectedValue(new Error('API Error'));

      const mockDispatch = jest.fn();
      const mockGetState = jest.fn(() => ({
        authedUser: 'sarahedo'
      }));

      const thunk = handleAddQuestion('Option 1', 'Option 2');
      
      await expect(thunk(mockDispatch, mockGetState)).rejects.toThrow('API Error');
    });
  });

  describe('handleAddQuestionAnswer', () => {
    it('should handle adding a question answer successfully', async () => {
      _saveQuestionAnswer.mockResolvedValue(true);

      const mockDispatch = jest.fn();
      const answerData = {
        authedUser: 'sarahedo',
        qid: 'q1',
        answer: 'optionOne'
      };

      const thunk = handleAddQuestionAnswer(answerData);
      await thunk(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith(addQuestionAnswer(answerData));
      expect(_saveQuestionAnswer).toHaveBeenCalledWith(answerData);
    });

    it('should handle API errors when adding an answer', async () => {
      _saveQuestionAnswer.mockRejectedValue(new Error('Save failed'));
      
      // Mock console.error and alert to avoid noise in tests
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation();

      const mockDispatch = jest.fn();
      const answerData = {
        authedUser: 'sarahedo',
        qid: 'q1',
        answer: 'optionOne'
      };

      const thunk = handleAddQuestionAnswer(answerData);
      await thunk(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith(addQuestionAnswer(answerData));
      expect(consoleSpy).toHaveBeenCalledWith('Error: Error: Save failed');
      expect(alertSpy).toHaveBeenCalledWith('Error: Error: Save failed');

      consoleSpy.mockRestore();
      alertSpy.mockRestore();
    });
  });
});