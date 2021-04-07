import axios from "axios";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

function getAllStarwarsPeople() {
  let people = [];
  // first page
  return axios("https://swapi.dev/api/people/")
    .then((response) => {
      // collect people from first page
      people = response.data.results;
      return response.data.count;
    })
    .then((count) => {
      // exclude the first request
      const numberOfPagesLeft = Math.ceil((count - 1) / 10);
      let promises = [];
      // start at 2 as you already queried the first page
      for (let i = 2; i <= numberOfPagesLeft; i++) {
        promises.push(axios(`https://swapi.dev/api/people?page=${i}`)); // Crea las peticiones extra al api
      }
      // Crea un array con las respuestas de las peticiones creadas anteriormente
      return Promise.all(promises);
    })
    .then((response) => {
      // console.log(response);
      //get the rest records - pages 2 through n.
      people = response.reduce(
        (acc, data) => [...acc, ...data.data.results],
        people
      );
      // console.log(people);
      // console.log(people.length);
      return people;
    })
    .then((response) => {
      // console.log(response);
      // Hacemos el loop sobre las personas
      for (let i = 0; i < response.length; i++) {
        let url = response[i].homeworld; // Obtenemos el url al cual haremos la peticion para cada una de las personas

        // Async para poder resolver las promesas de axios
        const getHomeworld = async (url) => {
          let homeworldName = await axios.get(url); // obtenemos el objeto data de la peticion axios
          response[i].homeworld = homeworldName.data.name;
        };

        getHomeworld(url); //Llamamos la funcion para setear los valores
      }

      console.log(response);
    })
    .catch((error) => console.log("Properly handle your exception here"));
}

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const data = await getAllStarwarsPeople();
    // console.log(data);

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
