import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Paginate from "../components/Paginate";
import { listProducts } from "../actions/productActions";

const HomeScreen = ({ match }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages } = productList;

  const page = match.params.page || 1;

  useEffect(() => {
    dispatch(listProducts(page));
  }, [dispatch, page]);

  return (
    <>
      {loading ? (
        <h1>Cargando</h1>
      ) : error ? (
        <h3>Error</h3>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4}>
                <Product product={product} />
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
