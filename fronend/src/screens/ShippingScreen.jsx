import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [country, setCountry] = useState(shippingAddress?.country || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />

      <h1>משלוח</h1>
      <Form onSubmit={submitHandler}>
        {/*  */}
        <Form.Group controlId="address" className="my-2">
          <Form.Label>כתובת</Form.Label>
          <Form.Control
            type="text"
            placeholder="הכנס כתובת "
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {/*  */}
        <Form.Group controlId="city" className="my-2">
          <Form.Label>עיר</Form.Label>
          <Form.Control
            type="text"
            placeholder="הכנס עיר "
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {/*  */}
        <Form.Group controlId="postalCode" className="my-2">
          <Form.Label>מיקוד</Form.Label>
          <Form.Control
            type="text"
            placeholder="הכנס מיקוד "
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {/*  */}
        <Form.Group controlId="country" className="my-2">
          <Form.Label>מדינה</Form.Label>
          <Form.Control
            type="text"
            placeholder="הכנס מדינה "
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {/*  */}

        <Button type="submit" variant="primary" className="my-2">
          המשך
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
