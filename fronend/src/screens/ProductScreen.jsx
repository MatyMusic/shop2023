import { Link, useParams, useNavigate } from "react-router-dom";

import {
  Form,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
} from "react-bootstrap";

import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useState } from "react";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        ...product,
        qty,
      })
    );
    navigate("/cart");
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        חזרה אחורה
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <>
          <Row>
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews}rating `}
                  />
                </ListGroup.Item>
                <ListGroup.Item>מחיר: ${product.price}</ListGroup.Item>

                <ListGroup.Item> תיאור: {product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  {/*  */}
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong> {product.price} </strong>
                      </Col>
                      <Col>:מחיר </Col>
                    </Row>
                  </ListGroup.Item>

                  {/*  */}
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>
                          {" "}
                          {product.countInStock > 0
                            ? "במלאי"
                            : "אזל מהמלאי"}{" "}
                        </strong>
                      </Col>
                      <Col>:סטטוס</Col>
                    </Row>
                  </ListGroup.Item>

                  {/*  */}

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>כמות</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      הוסף מוצר לעגלה
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
