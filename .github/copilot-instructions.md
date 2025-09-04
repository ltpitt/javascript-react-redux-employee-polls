# Employee Polls - React & Redux Application

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

This is a React 18 + Redux Toolkit application demonstrating modern React patterns, Redux state management, and React Router. It serves as both a functional employee polling system and an educational resource.

## Working Effectively

### Bootstrap and Install Dependencies
- **Required**: Node.js 20.x and npm 10.x (tested with Node.js 20.19.4, npm 10.8.2)
- `npm install` -- takes 60 seconds. **NEVER CANCEL**. Set timeout to 90+ seconds.
- Installation shows 11 security vulnerabilities (2 low, 3 moderate, 6 high) - this is expected and does not affect functionality.

### Build the Application
- `CI=false npm run build` -- takes 15 seconds. **NEVER CANCEL**. Set timeout to 30+ seconds.
- **CRITICAL**: Use `CI=false` prefix to prevent build failure due to ESLint warnings.
- Standard `npm run build` will fail in CI environments due to jsx-a11y accessibility warnings.
- Build outputs to `build/` directory with optimized production files.

### Run Tests
- `npm test -- --coverage --passWithNoTests --watchAll=false` -- takes 10 seconds. **NEVER CANCEL**. Set timeout to 30+ seconds.
- Runs 3 test suites with 10 tests total (all pass).
- Coverage report shows ~30% overall coverage, which is expected for this educational project.

### Run Development Server
- `npm start` -- takes 10 seconds to start. **NEVER CANCEL**. Set timeout to 30+ seconds.
- Runs on http://localhost:3000
- Compiles with ESLint warnings about accessibility (img alt tags, anchor hrefs) - these are expected.
- Server stays running for development; use Ctrl+C to stop.

### Lint Code
- No dedicated lint script available in package.json.
- ESLint is available via `npx eslint [files]` (version 8.25.0).
- Current codebase has jsx-a11y warnings that need to be addressed for production builds.

## Validation Scenarios

**ALWAYS manually validate changes by running through these complete user scenarios:**

### Basic Application Flow
1. Start development server: `npm start`
2. Navigate to http://localhost:3000
3. **Login Test**: Use credentials `sarahedo` / `password123`
4. **Home Page Test**: Verify polls display with "Unanswered questions (2)" and "Answered questions (4)" tabs
5. **Navigation Test**: Click through Home, Leaderboard, and New poll pages
6. **Poll Interaction**: Click on a poll to view details and voting options

### Test User Accounts
Use these accounts for testing authentication and user scenarios:
- `sarahedo` / `password123` (Primary test user - most active)
- `tylermcginnis` / `abc321`
- `mtsamis` / `xyz123`  
- `zoshikanlu` / `pass246`

### Complete End-to-End Validation
1. Install dependencies and ensure no errors
2. Run test suite and verify all tests pass
3. Build application successfully with `CI=false`
4. Start development server
5. Test login with primary user account
6. Navigate to each major page (Home, Leaderboard, New Poll)
7. Verify poll display and user interface functionality

## Known Issues and Workarounds

### Build Issues
- **Problem**: `npm run build` fails with ESLint jsx-a11y errors in CI environments
- **Solution**: Use `CI=false npm run build` to treat warnings as warnings, not errors
- **Root Cause**: Missing alt attributes on img elements and invalid href attributes on anchor elements

### Development Warnings
- Browserslist warnings about outdated caniuse-lite database (safe to ignore)
- Webpack dev server deprecation warnings (safe to ignore)
- ESLint accessibility warnings (do not affect functionality)

### CI/CD Pipeline
- GitHub Actions workflow runs on Node.js 14.x, 16.x, 18.x
- Pipeline will fail on `npm test` due to build-time ESLint errors
- Tests themselves pass; failure is due to linting during compilation

## Project Structure and Key Locations

### Essential Files and Directories
```
src/
├── components/           # All React components organized by feature
│   ├── app/App.js       # Main application component with routing
│   ├── auth/Auth.js     # Login/authentication component  
│   ├── home/Home.js     # Home page with poll listings
│   ├── poll/Poll.js     # Individual poll display and voting
│   ├── poll/NewPoll.js  # Create new poll form
│   └── leaderboard/Leaderboard.js  # User rankings display
├── actions/             # Redux action creators
├── reducers/            # Redux reducers for state management
├── store/store.js       # Redux store configuration
├── utils/_DATA.js       # Mock database with users and polls
└── utils/api.js         # API interface functions
```

### Key Components by React Concepts
- **Hooks Usage**: `src/components/app/App.js` (useEffect, useRoutes)
- **Redux Integration**: All page components use Redux connect() HOC
- **Form Handling**: `src/components/auth/Auth.js`, `src/components/poll/NewPoll.js`
- **Route Protection**: `src/components/private_route/PrivateRoute.js`
- **Testing Examples**: `src/components/auth/Auth.test.js`, `src/components/poll/NewPoll.test.js`

### Configuration Files
- `package.json` - Dependencies and scripts (no custom lint script)
- `.github/workflows/node.js.yml` - CI pipeline (runs npm ci and npm test)
- `src/setupTests.js` - Jest configuration
- Built-in ESLint config from react-scripts

## Common Development Tasks

### Making Changes to Components
1. **ALWAYS** run tests first to ensure current state: `npm test -- --coverage --passWithNoTests --watchAll=false`
2. Start development server: `npm start`
3. Make changes to components in `src/components/`
4. Test changes in browser at http://localhost:3000
5. Run tests again to verify no regressions
6. Build with `CI=false npm run build` to ensure production compatibility

### Redux State Changes
- Modify actions in `src/actions/`
- Update reducers in `src/reducers/`
- Test state changes through component interactions
- Verify Redux DevTools show correct action dispatching (logs visible in console)

### Adding New Routes
- Update routing configuration in `src/components/app/App.js`
- Add route protection with `PrivateRoute` wrapper if authentication required
- Test navigation between all routes

### Working with Mock Data
- User and poll data defined in `src/utils/_DATA.js`
- API functions in `src/utils/api.js` simulate async operations
- Modify mock data for testing different scenarios

## Time Expectations

| Operation | Expected Time | Timeout Setting |
|-----------|---------------|----------------|
| npm install | 60 seconds | 90+ seconds |
| npm test | 10 seconds | 30+ seconds |
| npm run build (CI=false) | 15 seconds | 30+ seconds |
| npm start (initial) | 10 seconds | 30+ seconds |

**CRITICAL**: NEVER CANCEL long-running operations. The build and test processes are reliable but require adequate time to complete.