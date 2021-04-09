import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const People = ({ peopleInstance }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      {/* <Link> */}
      {/* <Card.Img src='holder.js/100px180' variant='top' /> */}
      {/* </Link> */}

      <Card.Body>
        {/* <Link> */}
        <Card.Title as='h5'>
          <strong className='txt-primary fs-1'>{peopleInstance.name}</strong>
        </Card.Title>
        {/* </Link> */}

        <Card.Text as='h3'>{peopleInstance.homeworld}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default People;
