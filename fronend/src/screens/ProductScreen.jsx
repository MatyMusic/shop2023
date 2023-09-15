import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";

const ProductScreen = () => {
  const [product, setProduct] = useState({});

  const { id: productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${productId}`);
      setProduct(data);
    };

    fetchProduct();
  }, [productId]);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        חזרה אחורה
      </Link>
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
                      {product.countInStock > 0 ? "במלאי" : "אזל מהמלאי"}{" "}
                    </strong>
                  </Col>
                  <Col>:סטטוס</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  הוסף מוצר לעגלה
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
