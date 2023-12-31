import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";

import { toast } from "react-toastify";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

import Message from "./../components/Message";
import Loader from "./../components/Loader";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation,
} from "../slices/ordersApiSlice";
import { useSelector } from "react-redux";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "ILS",
          },
        });

        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("התשלום בוצע בהצלחה");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }
  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success("התשלום בוצע בהצלחה");
  }
  function onError(err) {
    toast.err(err.message);
  }
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("הזמנה נשלחה ללקוח");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" />
  ) : (
    <>
      <h1> להזמין {order._id} </h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>משלוח</h2>
              <p>
                <strong> שם: </strong>
                {order.user.name}
              </p>
              <p>
                {order.user.email}
                <strong> :דוא"ל </strong>
              </p>
              <p>
                <strong> כתובת: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {/*  */}
              {order.isDelivered ? (
                <Message variant="success">נשלח ב {order.deliveredAt}</Message>
              ) : (
                <Message variant="danger">לא נשלח</Message>
              )}
              {/*  */}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>אמצעי תשלום</h2>
              <p>
                {order.paymentMethod}

                <strong> :תשלום יבוצע ב</strong>
              </p>

              {/*  */}
              {order.isPaid ? (
                <Message variant="success">שולם ב {order.paidAt}</Message>
              ) : (
                <Message variant="danger">לא שולם</Message>
              )}
              {/*  */}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2> פריטי ההזמנה</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} X ש"ח{item.price} = ש"ח {item.qty * item.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>סיכום הזמנה</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                {/*  */}
                <Row>
                  <Col> {order.itemsPrice} ILS </Col>
                  <Col> :פריטים</Col>
                </Row>
                {/*  */}
                <Row>
                  <Col>{order.shippingPrice} ILS </Col>
                  <Col>:משלוח</Col>
                </Row>
                {/*  */}
                <Row>
                  <Col> {order.taxPrice} ILS </Col>
                  <Col>:מע"מ</Col>
                </Row>
                {/*  */}
                <Row>
                  <Col>{order.totalPrice} ILS </Col>
                  <Col>:סך הכל</Col>
                </Row>
                {/*  */}
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}

                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <Button
                        onClick={onApproveTest}
                        style={{
                          marginBottom: "10px",
                        }}
                      >
                        תשלום
                      </Button>
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}

              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverOrderHandler}
                    >
                      לסמן כנשלח
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
