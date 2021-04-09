import {
  PEOPLE_DETAILS_FAIL,
  PEOPLE_DETAILS_REQUEST,
  PEOPLE_DETAILS_SUCCESS,
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

export const peopleDetailsReducer = (
  state = { peopleInstance: { films: [], vehicles: [], starships: [] } },
  action
) => {
  switch (action.type) {
    case PEOPLE_DETAILS_REQUEST:
      return {
        loading: true,
        peopleInstance: {},
      };

    case PEOPLE_DETAILS_SUCCESS:
      return {
        loading: false,
        peopleInstance: action.payload,
      };

    case PEOPLE_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
