# Employee Polls - React & Redux Learning Application

This project is a comprehensive React application that demonstrates modern React development patterns, Redux state management, and React Router. It serves as both a functional employee polling system and an educational resource for learning React concepts.

## 🎯 Application Overview

A web application that allows employees to:
- Vote on existing polls
- Create new polls
- View leaderboards
- Authenticate and manage sessions

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm start
```
Opens the app in development mode at [http://localhost:3000](http://localhost:3000)

### Testing
```bash
npm test
```
Runs the test suite in interactive watch mode

### Production Build
```bash
npm run build
```
Creates an optimized production build in the `build` folder

## 📚 React Concepts Demonstrated

This application showcases a wide range of React concepts and patterns:

### 🎣 React Hooks
- **useState**: Local state management in forms and UI components
- **useEffect**: Side effects, authentication checks, data loading
- **useRoutes**: Declarative routing configuration
- **useNavigate**: Programmatic navigation
- **useParams**: Route parameter extraction

**Examples**: 
- `src/components/auth/Auth.js` - Form state with useState
- `src/components/app/App.js` - Data loading with useEffect
- `src/components/poll/NewPoll.js` - Form handling and navigation

### 🏪 State Management (Redux)
- **Redux Toolkit**: Modern Redux with simplified configuration
- **Actions & Reducers**: State management patterns
- **Async Actions**: Thunks for API calls
- **Connected Components**: React-Redux integration
- **Custom Middleware**: Logging and development tools

**Examples**:
- `src/store/store.js` - Redux store configuration
- `src/actions/` - Action creators and async thunks
- `src/reducers/` - State reducers
- All connected components use `connect()` HOC

### 🧭 Routing & Navigation
- **React Router v6**: Modern routing patterns
- **Private Routes**: Authentication-based route protection
- **Route Parameters**: Dynamic routing with URL parameters
- **Programmatic Navigation**: useNavigate hook
- **Query Parameters**: URL state management

**Examples**:
- `src/components/app/App.js` - Route configuration with useRoutes
- `src/components/private_route/PrivateRoute.js` - Route protection HOC
- `src/components/poll/Poll.js` - Route parameters usage

### 📝 Forms & Input Handling
- **Controlled Components**: Form inputs bound to React state
- **Form Validation**: Input validation patterns
- **Event Handling**: Form submission and input changes
- **State Updates**: Synchronous state management

**Examples**:
- `src/components/auth/Auth.js` - Login form with controlled inputs
- `src/components/poll/NewPoll.js` - Poll creation form

### 🔐 Authentication & Security
- **Authentication Flow**: Login/logout patterns
- **Route Protection**: Private route implementation
- **Session Management**: User state persistence
- **Conditional Rendering**: UI based on auth state

**Examples**:
- `src/components/auth/Auth.js` - Authentication component
- `src/components/private_route/PrivateRoute.js` - Route protection

### 🧪 Testing
- **React Testing Library**: Component testing
- **Jest Snapshots**: UI regression testing
- **User Interaction Testing**: Event simulation
- **Redux Testing**: State management testing

**Examples**:
- `src/components/auth/Auth.test.js` - Component testing
- `src/components/poll/NewPoll.test.js` - Form testing
- `src/utils/_DATA.test.js` - Utility testing

## 📁 Folder Structure

```
src/
├── components/          # React components organized by feature
│   ├── app/            # Main application component and routing
│   ├── auth/           # Authentication components
│   ├── home/           # Home page with poll listing
│   ├── leaderboard/    # User leaderboard display
│   ├── nav/            # Navigation component
│   ├── page_not_found/ # 404 error page
│   ├── poll/           # Poll creation and voting components
│   ├── private_route/  # Route protection utility
│   └── question/       # Individual poll question display
├── actions/            # Redux action creators
├── reducers/           # Redux reducers
├── store/              # Redux store configuration
├── middleware/         # Custom Redux middleware
└── utils/              # Utilities, API, and mock data
```

### Component Categories by React Concepts

| Category | Components | React Concepts |
|----------|------------|----------------|
| **Layout & Navigation** | `App.js`, `Nav.js` | useRoutes, useEffect, useNavigate |
| **Authentication** | `Auth.js`, `PrivateRoute.js` | useState, conditional rendering, HOC |
| **Forms** | `Auth.js`, `NewPoll.js` | Controlled components, form handling |
| **Pages** | `Home.js`, `Leaderboard.js`, `Poll.js` | Redux integration, data display |
| **UI Components** | `Question.js`, `PageNotFound.js` | Props, presentational components |

## 🎓 Learning Paths

### For Beginners
1. Start with `src/components/question/Question.js` - Simple presentational component
2. Explore `src/components/auth/Auth.js` - Form handling and state
3. Review `src/components/home/Home.js` - Data display and filtering

### For Intermediate Developers
1. Study `src/components/app/App.js` - Routing and application structure
2. Examine Redux setup in `src/store/store.js` and related files
3. Analyze `src/components/private_route/PrivateRoute.js` - Higher-order components

### For Advanced Developers
1. Review the complete Redux architecture
2. Analyze testing strategies and patterns
3. Study the middleware implementation
4. Consider potential optimizations and modern patterns

## 🔧 Technologies Used

- **React 18**: Latest React with hooks
- **Redux Toolkit**: Modern Redux state management
- **React Router 7**: Latest routing solution
- **React Testing Library**: Modern testing approaches
- **Bootstrap 5**: UI styling framework
- **Jest**: Testing framework

## 📖 Additional Resources

- [REACT_CONCEPTS_AUDIT.md](./REACT_CONCEPTS_AUDIT.md) - Detailed audit of React patterns used
- [FOLDER_STRUCTURE_ANALYSIS.md](./FOLDER_STRUCTURE_ANALYSIS.md) - Analysis of current structure and alternatives

## 🤝 Contributing

This application serves as both a functional app and educational resource. When contributing:

1. Maintain existing patterns for consistency
2. Add tests for new functionality
3. Update documentation for new React concepts
4. Consider educational value of changes

## 📝 License

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses the [Redux Toolkit](https://redux-toolkit.js.org/) template.
