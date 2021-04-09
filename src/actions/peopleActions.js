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
    // Obtenemos el nombre del planeta de la persona
    let homeworld = await axios.get(data.homeworld);
    data.homeworld = homeworld.data.name;
    console.log(data);

    // Obtenemos las peliculas iterando sobre las url del array
    let filmCount = data.films.length;
    for (let i = 0; i < filmCount; i++) {
      let film = await axios.get(data.films[i]);
      data.films[i] = film.data.title;
    }

    // Obtenemos los vehiculos
    for (let i = 0; i < data.vehicles.length; i++) {
      let vehicle = await axios.get(data.vehicles[i]);
      data.vehicles[i] = vehicle.data.name;
    }

    // Obtenemos las naves
    for (let i = 0; i < data.starships.length; i++) {
      let shatship = await axios.get(data.starships[i]);
      data.starships[i] = shatship.data.name;
    }

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
