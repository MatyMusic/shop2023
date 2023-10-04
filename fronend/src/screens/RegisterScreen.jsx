import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("סיסמאות לא תואמות");
      return;
    } else {
      try {
        const res = await register({
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <div>
      <FormContainer>
        <h1>הירשם</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-3">
            <Form.Label> שם מלא </Form.Label>
            <Form.Control
              type="text"
              placeholder="הכנס שם מלא"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/*  */}
          <Form.Group controlId="email" className="my-3">
            <Form.Label>כתובת דוא"ל</Form.Label>
            <Form.Control
              type="email"
              placeholder='הכנס דוא"ל'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/*  */}
          <Form.Group controlId="password" className="my-3">
            <Form.Label>סיסמא</Form.Label>
            <Form.Control
              type="password"
              placeholder="הכנס סיסמא"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/*  */}
          <Form.Group controlId="confirmPassword" className="my-3">
            <Form.Label>אשר סיסמה</Form.Label>
            <Form.Control
              type="password"
              placeholder="אשר סיסמה"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/*  */}

          <Button
            type="submit"
            variant="primary"
            className="mt-2"
            disabled={isLoading}
          >
            הירשם
          </Button>

          {isLoading && <Loader />}
        </Form>

        <Row className="py-3">
          <Col>
            יש לך כבר חשבון?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
            >
              התחבר
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
};

export default RegisterScreen;
