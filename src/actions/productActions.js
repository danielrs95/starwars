import axios from "axios";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

async function getAllStarwarsPeople() {
  let response = await axios.get("https://swapi.dev/api/people/");
  const count = response.data.count;
  const numberOfPagesLeft = Math.ceil((count - 1) / 10); // Redondeamos al entero mayor es decir 9

  // Extraemos la primera página
  let people = response.data.results;

  for (let i = 2; i <= numberOfPagesLeft; i++) {
    // Hacemos petición a cada una de las paginas de people, osea 9
    response = await axios(`https://swapi.dev/api/people?page=${i}`);
    // Agregamos cada pagina a un solo array, people
    people = people.concat(response.data.results);
  }

  for (let i = 0; i < people.length; i++) {
    // Hacemos la petición para popular people.homeworld
    response = await axios(people[i].homeworld);
    people[i].homeworld = response.data.name;
  }

  return people;
}

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const data = await getAllStarwarsPeople();

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
