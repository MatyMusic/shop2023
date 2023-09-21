import React from "react";

import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

import logo from "../assets/logo.png";
// import logo from "../assets/logo2.jpg";
const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);

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
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser />
                  כניסה
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
