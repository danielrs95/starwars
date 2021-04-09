import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup, ListGroupItem, Col } from "react-bootstrap";
import { getPeopleDetails } from "../actions/peopleActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const PeopleScreen = ({ match }) => {
  const dispatch = useDispatch();

  // Traemos el estado y destructuramos lo necesario
  const peopleDetails = useSelector((state) => state.peopleDetails);
  const { loading, error, peopleInstance } = peopleDetails;

  useEffect(() => {
    dispatch(getPeopleDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danter'>{error}</Message>
      ) : (
        <Col className='mt-2'>
          <ListGroup>
            <ListGroup.Item>
              <h2>{peopleInstance.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <ul
                className='people_details_list'
                style={{ listStyleType: "none" }}
              >
                <li>
                  <strong>Homeworld</strong> {peopleInstance.homeworld}
                </li>
                <li>
                  <strong>Birth year:</strong> {peopleInstance.birth_year}
                </li>
                <li>
                  <strong>Gender:</strong> {peopleInstance.gender}
                </li>
                <li>
                  <strong>Height:</strong> {peopleInstance.height}
                </li>
                <li>
                  <strong>Mass:</strong> {peopleInstance.mass}
                </li>
              </ul>
            </ListGroup.Item>

            {peopleInstance.films.length === 0 ? (
              <></>
            ) : (
              <ListGroup.Item>
                <h3>Films</h3>
                <ul className='people_details_list'>
                  {peopleInstance.films.map((film) => (
                    <li>{film}</li>
                  ))}
                </ul>
              </ListGroup.Item>
            )}

            {peopleInstance.vehicles.length === 0 ? (
              <></>
            ) : (
              <ListGroup.Item>
                <h3>Vehicles</h3>
                <ul className='people_details_list'>
                  {peopleInstance.vehicles.map((vehicle) => (
                    <li>{vehicle}</li>
                  ))}
                </ul>
              </ListGroup.Item>
            )}

            {peopleInstance.starships.length === 0 ? (
              <></>
            ) : (
              <ListGroup.Item>
                <h3>Starships</h3>
                <ul className='people_details_list'>
                  {peopleInstance.starships.map((starship) => (
                    <li>{starship}</li>
                  ))}
                </ul>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      )}
    </>
  );
};

export default PeopleScreen;
