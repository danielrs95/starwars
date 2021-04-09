import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import People from "../components/People";
import Paginate from "../components/Paginate";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listPeople } from "../actions/peopleActions";

const HomeScreen = ({ match }) => {
  const dispatch = useDispatch();

  const peopleList = useSelector((state) => state.peopleList);
  const { loading, error, people, pages } = peopleList;

  const page = match.params.page || 1;

  useEffect(() => {
    dispatch(listPeople(page));
  }, [dispatch, page]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {people.map((peopleInstance) => (
              <Col sm={12} md={6} lg={4}>
                <People
                  key={peopleInstance.url}
                  peopleInstance={peopleInstance}
                />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
