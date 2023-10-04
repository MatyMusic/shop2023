import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "./../components/Message";
import { toast } from "react-toastify";
import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Loader from "./../components/Loader";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { FaTimes } from "react-icons/fa";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo.name, userInfo.email, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("סיסמאות לא תואמות");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("פרופיל התעדכן בהצלחה");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>פרופיל משתמש</h2>
        <Form onSubmit={submitHandler}>
          {/*  */}
          <Form.Group controlId="name" className="my-2">
            <Form.Label> :שם</Form.Label>
            <Form.Control
              type="name"
              placeholder="הכנס שם מלא"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/*  */}
          <Form.Group controlId="email" className="my-2">
            <Form.Label> דוא"ל</Form.Label>
            <Form.Control
              type="email"
              placeholder='דוא"ל'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/*  */}
          <Form.Group controlId="password" className="my-2">
            <Form.Label> סיסמא</Form.Label>
            <Form.Control
              type="password"
              placeholder="הכנס סיסמא "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/*  */}
          <Form.Group controlId="confirmPassword" className="my-2">
            <Form.Label> אמת סיסמא</Form.Label>
            <Form.Control
              type="confirmPassword"
              placeholder="אמת סיסמא "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/*  */}

          <Button type="submit" variant="primary" className="my-2">
            עדכן
          </Button>

          {loadingUpdateProfile && <Loader />}
        </Form>
      </Col>

      <Col md={9}>
        <h2>ההזמנות שלי</h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th> מספר מוצר</th>
                <th> תאריך </th>
                <th> סך הכל</th>
                <th>שולם</th>
                <th>נשלח</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td> {order.createdAt.substring(0, 10)} </td>
                  <td> ש"ח {order.totalPrice} </td>
                  {/*  */}
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0.1)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  {/*  */}
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0.1)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  {/*  */}

                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        פרטים
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
