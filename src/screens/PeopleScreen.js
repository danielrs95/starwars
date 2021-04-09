import React from "react";
import { Table } from "react-bootstrap";

const PeopleScreen = () => {
  return (
    <>
      <Table striped bordered hover size='sm' className='mt-2'>
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
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default PeopleScreen;
