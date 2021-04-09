import {
  PEOPLE_LIST_FAIL,
  PEOPLE_LIST_REQUEST,
  PEOPLE_LIST_SUCCESS,
} from "../constants/peopleConstants";

export const peopleListReducer = (state = { people: [] }, action) => {
  switch (action.type) {
    case PEOPLE_LIST_REQUEST:
      return { loading: true, people: [] };

    case PEOPLE_LIST_SUCCESS:
      return {
        loading: false,
        people: action.payload.people,
        pages: action.payload.pages,
        // pagesize: action.payload.pagesize,
      };

    case PEOPLE_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
