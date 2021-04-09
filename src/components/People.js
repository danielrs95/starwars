import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const People = ({ peopleInstance }) => {
  return (
    <Card
      className='my-3 p-3 rounded'
      border='primary'
      style={{ height: "90%" }}
    >
      <Card.Body>
        <Link
          to={`/people/${peopleInstance.id}`}
          style={{ textDecoration: "none" }}
        >
          <Card.Title as='h4'>
            <strong className='txt-primary fs-1'>{peopleInstance.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='h5'>Homeworld: {peopleInstance.homeworld}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default People;
