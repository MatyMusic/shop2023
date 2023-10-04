import React from "react";
import { useNavigate } from "react-router-dom";

import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

import logo from "../assets/logo.png";
const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img className="logo" src={logo} alt="shopping" />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls=" basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              style={{
                textAlign: "center",
              }}
              className="ms-auto"
            >
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart />
                  עגלת קניות
                  {cartItems.length > 0 && (
                    <Badge
                      pill
                      bg="success"
                      style={{
                        marginLeft: "5px",
                      }}
                    >
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>פרופיל</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    יציאה
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser />
                    כניסה
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="מנהל" id="adminmenu">
                  {/* //! 1    מוצרים */}
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>מוצרים</NavDropdown.Item>
                  </LinkContainer>
                  {/* //!2   לקוחות  */}
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>לקוחות שלי</NavDropdown.Item>
                  </LinkContainer>
                  {/* //!3   הזמנות */}
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>הזמנות</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
