import axios from "axios";
import {
  PEOPLE_DETAILS_FAIL,
  PEOPLE_DETAILS_REQUEST,
  PEOPLE_DETAILS_SUCCESS,
  PEOPLE_LIST_FAIL,
  PEOPLE_LIST_REQUEST,
  PEOPLE_LIST_SUCCESS,
} from "../constants/peopleConstants";

export const listPeople = (page = "") => async (dispatch) => {
  try {
    dispatch({ type: PEOPLE_LIST_REQUEST });

    let allPeople = await axios.get("https://swapi.dev/api/people/");
    const count = allPeople.data.count;
    const pages = Math.ceil((count - 1) / 10); // Redondeamos al entero mayor es decir 9

    const request = await axios.get(
      `https://swapi.dev/api/people?page=${page}`
    );
    let people = request.data.results;
    // Populamos el nombre del planeta
    for (let i = 0; i < people.length; i++) {
      let planets = "";
      // Hacemos la petición para popular people.homeworld
      planets = await axios(people[i].homeworld);
      people[i].homeworld = planets.data.name;
      // Agregamos el ID al array de people, con un regex obetenmos solo el digito
      people.forEach((item) => (item.id = item.url.match(/\d/g).join("")));
    }

    console.log(people);

    let data = {
      people,
      pages,
    };

    dispatch({
      type: PEOPLE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PEOPLE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPeopleDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PEOPLE_DETAILS_REQUEST });

    const { data } = await axios.get(`https://swapi.dev/api/people/${id}`);

    // let people = request.data.results;
    // // Populamos el nombre del planeta
    // for (let i = 0; i < people.length; i++) {
    //   let planets = "";
    //   // Hacemos la petición para popular people.homeworld
    //   planets = await axios(people[i].homeworld);
    //   people[i].homeworld = planets.data.name;
    //   // Agregamos el ID al array de people, con un regex obetenmos solo el digito
    //   people.forEach((item) => (item.id = item.url.match(/\d/g).join("")));
    // }

    dispatch({
      type: PEOPLE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PEOPLE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
