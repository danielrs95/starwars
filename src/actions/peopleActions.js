import axios from "axios";
import {
  PEOPLE_LIST_FAIL,
  PEOPLE_LIST_REQUEST,
  PEOPLE_LIST_SUCCESS,
} from "../constants/peopleConstants";

async function getAllStarwarsPeople() {
  let response = await axios.get("https://swapi.dev/api/people/");
  const count = response.data.count;
  const pages = Math.ceil((count - 1) / 10); // Redondeamos al entero mayor es decir 9
  const pagesize = 10;
  let people = [];

  // const people = await axios.get(`https://swapi.dev/api/people?page=${i}`);

  // Extraemos la primera página
  // let people = response.data.results;

  // for (let i = 2; i <= pages; i++) {
  //   // Hacemos petición a cada una de las paginas de people, osea 9
  //   response = await axios(`https://swapi.dev/api/people?page=${i}`);
  //   // Agregamos cada pagina a un solo array, people
  //   people = people.concat(response.data.results);
  // }

  // for (let i = 0; i < people.length; i++) {
  //   // Hacemos la petición para popular people.homeworld
  //   response = await axios(people[i].homeworld);
  //   people[i].homeworld = response.data.name;
  // }

  let data = {
    people,
    // pages,
    // pagesize,
  };

  return data;
}

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
