import React from "react";
import { Menu, Button, MenuItem, Container, Responsive } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import SignedOutMenu from "./Menu/SignedOut-Menu";
import SignedInMenu from "./Menu/SignedIn-Menu";
import { useSelector } from "react-redux";

const Navbar = () => {
  const {isAuthenticated} = useSelector((state) => state.auth);

  return (
    <Menu inverted fixed="top">
      <Container>
        <Responsive as={MenuItem} minWidth={600} header  exact>
          <img
            alt=" "
            style={{ marginRight: "0.7em" }}
            src={"assets/logo.png"}
          />
          <Link to="/" >Hangout Club</Link>
        </Responsive>
        <MenuItem as={NavLink} to="/event" name="Events" />
        {isAuthenticated && (
          <MenuItem as={Link} to="/createEvent">
            <Button positive inverted content="Create Event" />
          </MenuItem>
        )}
        {isAuthenticated ? <SignedInMenu /> : <SignedOutMenu />}
      </Container>
    </Menu>
  );
};
export default Navbar;
