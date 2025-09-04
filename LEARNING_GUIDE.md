# React Learning Guide - Code Examples

This guide provides specific code examples for each React concept demonstrated in the Employee Polls application.

## 🎣 React Hooks Examples

### useState Hook
**File**: `src/components/auth/Auth.js`
```javascript
const [username, setUsername] = useState("sarahedo");
const [password, setPassword] = useState("password123");

const handleUsername = (e) => {
  const value = e.target.value;
  setUsername(value);
};
```
**Concept**: Local state management with controlled form inputs

**File**: `src/components/home/Home.js`
```javascript
const [showUnansweredQuestions, setShowUnansweredQuestions] = React.useState(false);
const onClick = () => setShowUnansweredQuestions(!showUnansweredQuestions);
```
**Concept**: UI state toggling with useState

### useEffect Hook
**File**: `src/components/app/App.js`
```javascript
useEffect(() => {
  props.dispatch(handleInitialData());
});
```
**Concept**: Side effects for data loading on component mount

**File**: `src/components/nav/Nav.js`
```javascript
useEffect(() => {
  const isLoggedIn = authedUser !== null;
  if (!isLoggedIn) {
    navigate("/auth");
  }
}, [authedUser, navigate]);
```
**Concept**: Side effects with dependencies for authentication checks

### useRoutes Hook
**File**: `src/components/app/App.js`
```javascript
return useRoutes([
  {path: "/auth", element: <Auth/>, exact: true},
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Home/>
      </PrivateRoute>
    ),
    exact: true,
  },
  // ... more routes
]);
```
**Concept**: Declarative routing configuration

### useNavigate Hook
**File**: `src/components/poll/NewPoll.js`
```javascript
const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(handleAddQuestion(firstOption, secondOption));
  navigate("/");
};
```
**Concept**: Programmatic navigation after form submission

## 🏪 Redux State Management Examples

### Redux Store Configuration
**File**: `src/store/store.js`
```javascript
export const store = configureStore({
  reducer: combineReducers({
    authedUser: authedUserReducer,
    questions: questionsReducer,
    users: usersReducer,
  }),
  middleware: [thunk, logger],
});
```
**Concept**: Redux Toolkit store setup with combined reducers

### Connected Components
**File**: `src/components/auth/Auth.js`
```javascript
const mapStateToProps = ({ authedUser, users }) => ({
  loggedIn: !!authedUser,
  authedUser,
  users,
});

export default connect(mapStateToProps)(Auth);
```
**Concept**: Connecting React components to Redux store

### Action Dispatching
**File**: `src/components/auth/Auth.js`
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(handleLogin(username, password));
};
```
**Concept**: Dispatching actions from components

### Async Actions with Thunks
**File**: `src/actions/shared.js`
```javascript
export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
    });
  };
}
```
**Concept**: Async action creators with Redux Thunk

## 🧭 Routing Examples

### Route Parameters
**File**: `src/components/poll/Poll.js`
```javascript
const withRouter = (Component) => {
  return (props) => {
    let params = useParams();
    let navigate = useNavigate();
    let location = useLocation();
    return <Component {...props} router={{location, navigate, params}}/>;
  };
};
```
**Concept**: HOC for accessing route parameters and navigation

### Private Route Protection
**File**: `src/components/private_route/PrivateRoute.js`
```javascript
const PrivateRoute = ({ children, loggedIn }) => {
  const redirectUrl = window.location.href
    .toString()
    .split(window.location.host)[1];

  return loggedIn ? (
    children
  ) : (
    <Navigate to={`/auth?redirectTo=${redirectUrl}`} />
  );
};
```
**Concept**: Conditional rendering based on authentication state

## 📝 Form Handling Examples

### Controlled Components
**File**: `src/components/auth/Auth.js`
```javascript
<input
  value={username}
  onChange={handleUsername}
  type="text"
  className="form-control mt-1"
  placeholder="Enter email"
/>
```
**Concept**: Two-way data binding with controlled inputs

### Form Submission
**File**: `src/components/poll/NewPoll.js`
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(handleAddQuestion(firstOption, secondOption));
  navigate("/");
};
```
**Concept**: Form submission with preventDefault and state updates

## 🎨 Component Patterns Examples

### Higher-Order Components (HOC)
**File**: `src/components/private_route/PrivateRoute.js`
```javascript
const PrivateRoute = ({ children, loggedIn }) => {
  return loggedIn ? children : <Navigate to="/auth" />;
};
```
**Concept**: Component that wraps other components to add functionality

### Presentational Components
**File**: `src/components/question/Question.js`
```javascript
const Question = ({ question, author }) => {
  return (
    <div className="question">
      <div>
        <img src={author?.avatarURL} />
      </div>
      <div>
        <div>{question.author}</div>
        <p>{new Date(question.timestamp).toUTCString()}</p>
      </div>
    </div>
  );
};
```
**Concept**: Pure component that only displays data passed via props

### Conditional Rendering
**File**: `src/components/auth/Auth.js`
```javascript
if (loggedIn) {
  const urlParams = new URLSearchParams(window.location.search);
  const redirectUrl = urlParams.get("redirectTo");
  return <Navigate to={redirectUrl ? redirectUrl : "/"} />;
}
```
**Concept**: Early return based on component state

## 🧪 Testing Examples

### Component Testing
**File**: `src/components/auth/Auth.test.js`
```javascript
test('renders auth form', () => {
  const component = render(
    <Provider store={store}>
      <BrowserRouter>
        <Auth />
      </BrowserRouter>
    </Provider>
  );
  expect(component).toBeDefined();
});
```
**Concept**: Testing components with required providers

### Snapshot Testing
**File**: `src/components/poll/NewPoll.test.js`
```javascript
test("snapshot test", () => {
  const component = render(
    <Provider store={store}>
      <BrowserRouter>
        <NewPoll />
      </BrowserRouter>
    </Provider>
  );
  expect(component).toMatchSnapshot();
});
```
**Concept**: Snapshot testing for UI regression detection

## 🎯 Advanced Patterns

### Custom Middleware
**File**: `src/middleware/logger.js`
```javascript
const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log("The action: ", action);
  const returnValue = next(action);
  console.log("The new state: ", store.getState());
  console.groupEnd();
  return returnValue;
};
```
**Concept**: Redux middleware for debugging and logging

### Data Transformation in mapStateToProps
**File**: `src/components/home/Home.js`
```javascript
const mapStateToProps = ({ authedUser, questions, users }) => ({
  authedUser,
  questions: Object.values(questions).sort((a, b) => b.timestamp - a.timestamp),
  answeredQuestionsTotal: Object.values(questions).filter(
    (question) =>
      question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser)
  ).length,
  users,
});
```
**Concept**: Data transformation and computed properties in Redux selectors

## 📚 Learning Progression

### Beginner Level
1. Study `Question.js` - Basic component structure
2. Examine `Auth.js` - useState and form handling
3. Review `PageNotFound.js` - Simple functional component

### Intermediate Level
1. Analyze `Home.js` - Redux integration and data filtering
2. Study `PrivateRoute.js` - Higher-order components
3. Explore `App.js` - Application structure and routing

### Advanced Level
1. Deep dive into Redux architecture (actions, reducers, store)
2. Study testing patterns and strategies
3. Analyze middleware and advanced Redux patterns
4. Consider modernization opportunities (hooks vs connect)