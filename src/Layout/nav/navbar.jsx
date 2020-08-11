import React, { useState } from "react";
import { Menu, Button, MenuItem, Container } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import SignedOutMenu from "./Menu/SignedOut-Menu";
import SignedInMenu from "./Menu/SignedIn-Menu";

const Navbar = () => {
  const [auth, setAuth] = useState(false);
  return (
    <Menu inverted fixed="top">
      <Container>
        <MenuItem header as={NavLink} to="/" exact>
          <img
            alt="logo"
            style={{ marginRight: "0.7em" }}
            src={"assets/logo.png"}
          />
          Our-Event
        </MenuItem>
        <MenuItem as={NavLink} to="/event" name="Events" />
        {auth && (
          <MenuItem as={Link} to="/createEvent">
            <Button positive inverted content="Create Event" />
          </MenuItem>
        )} 
        {auth ? (
          <SignedInMenu setAuth={setAuth} />
        ) : (
          <SignedOutMenu setAuth={setAuth} />
        )}
      </Container>
    </Menu>
  );
};
export default Navbar;
