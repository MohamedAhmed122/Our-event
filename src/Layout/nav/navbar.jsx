import React from "react";
import { Menu, Button, MenuItem, Container } from "semantic-ui-react";

const Navbar = () => (
  <Menu inverted fixed="top">
    <Container>
      <MenuItem header>
        <img
          alt="logo"
          style={{ marginRight: "0.7em" }}
          src={"assets/logo.png"}
        />
        Our-Event
      </MenuItem>
      <MenuItem name="Events" />
      <MenuItem>
        <Button positive inverted content="Create Event" />
      </MenuItem>
      <MenuItem position="right">
        <Button basic inverted content="Login" />
        <Button
          basic
          inverted
          content="Register"
          style={{ marginLeft: "0.6em" }}
        />
      </MenuItem>
    </Container>
  </Menu>
);
export default Navbar;
