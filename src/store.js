import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  peopleDetailsReducer,
  peopleListReducer,
} from "./reducers/peopleReducers";

const reducer = combineReducers({
  peopleList: peopleListReducer,
  peopleDetails: peopleDetailsReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
