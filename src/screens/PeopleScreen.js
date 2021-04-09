import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { getPeopleDetails } from "../actions/peopleActions";

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
      <Table striped bordered hover size='sm' responsive className='mt-2'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Films</th>
            <th>Vehicles</th>
            <th>Starships</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{peopleInstance.name}</td>
            <td>{peopleInstance.films}</td>
            <td>{peopleInstance.vehicles}</td>
            <td>{peopleInstance.starships}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default PeopleScreen;
