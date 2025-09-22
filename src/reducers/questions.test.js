import questionsReducer from './questions';
import { 
  RECEIVE_QUESTIONS, 
  ADD_QUESTION, 
  ADD_QUESTION_ANSWER 
} from '../actions/questions';

describe('questions reducer', () => {
  const initialState = {};

  const mockQuestions = {
    'q1': {
      id: 'q1',
      author: 'sarahedo',
      timestamp: 1467166872634,
      optionOne: {
        votes: [],
        text: 'Option 1'
      },
      optionTwo: {
        votes: [],
        text: 'Option 2'
      }
    },
    'q2': {
      id: 'q2',
      author: 'tylermcginnis',
      timestamp: 1468479767190,
      optionOne: {
        votes: ['sarahedo'],
        text: 'Option A'
      },
      optionTwo: {
        votes: [],
        text: 'Option B'
      }
    }
  };

  it('should return the initial state', () => {
    expect(questionsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle RECEIVE_QUESTIONS', () => {
    const action = {
      type: RECEIVE_QUESTIONS,
      questions: mockQuestions
    };
    expect(questionsReducer(initialState, action)).toEqual(mockQuestions);
  });

  it('should handle ADD_QUESTION', () => {
    const newQuestion = {
      id: 'q3',
      author: 'mtsamis',
      timestamp: 1469479767190,
      optionOne: {
        votes: [],
        text: 'New Option 1'
      },
      optionTwo: {
        votes: [],
        text: 'New Option 2'
      }
    };

    const action = {
      type: ADD_QUESTION,
      question: newQuestion
    };

    const expectedState = {
      ...mockQuestions,
      q3: newQuestion
    };

    expect(questionsReducer(mockQuestions, action)).toEqual(expectedState);
  });

  it('should handle ADD_QUESTION_ANSWER for optionOne', () => {
    const action = {
      type: ADD_QUESTION_ANSWER,
      authedUser: 'tylermcginnis',
      qid: 'q1',
      answer: 'optionOne'
    };

    const expectedState = {
      ...mockQuestions,
      q1: {
        ...mockQuestions.q1,
        optionOne: {
          ...mockQuestions.q1.optionOne,
          votes: ['tylermcginnis']
        }
      }
    };

    expect(questionsReducer(mockQuestions, action)).toEqual(expectedState);
  });

  it('should handle ADD_QUESTION_ANSWER for optionTwo', () => {
    const action = {
      type: ADD_QUESTION_ANSWER,
      authedUser: 'mtsamis',
      qid: 'q1',
      answer: 'optionTwo'
    };

    const expectedState = {
      ...mockQuestions,
      q1: {
        ...mockQuestions.q1,
        optionTwo: {
          ...mockQuestions.q1.optionTwo,
          votes: ['mtsamis']
        }
      }
    };

    expect(questionsReducer(mockQuestions, action)).toEqual(expectedState);
  });

  it('should handle ADD_QUESTION_ANSWER with existing votes', () => {
    const stateWithVotes = {
      ...mockQuestions,
      q1: {
        ...mockQuestions.q1,
        optionOne: {
          ...mockQuestions.q1.optionOne,
          votes: ['sarahedo']
        }
      }
    };

    const action = {
      type: ADD_QUESTION_ANSWER,
      authedUser: 'tylermcginnis',
      qid: 'q1',
      answer: 'optionOne'
    };

    const expectedState = {
      ...stateWithVotes,
      q1: {
        ...stateWithVotes.q1,
        optionOne: {
          ...stateWithVotes.q1.optionOne,
          votes: ['sarahedo', 'tylermcginnis']
        }
      }
    };

    expect(questionsReducer(stateWithVotes, action)).toEqual(expectedState);
  });

  it('should return current state for unknown action types', () => {
    const action = {
      type: 'UNKNOWN_ACTION'
    };
    expect(questionsReducer(mockQuestions, action)).toEqual(mockQuestions);
  });
});