import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav justify-content-center mb-4>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>להתחבר</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>להתחבר</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>משלוח</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>משלוח</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>תשלום</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>תשלום</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>לבצע הזמנה</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>לבצע הזמנה</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
