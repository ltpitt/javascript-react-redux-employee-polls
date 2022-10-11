import logger from "./logger";
import thunk from "redux-thunk";

import { applyMiddleware } from "@reduxjs/toolkit";

export default applyMiddleware(thunk, logger);
