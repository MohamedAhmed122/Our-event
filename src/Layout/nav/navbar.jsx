import React from "react";
import { Menu, Button, MenuItem, Container } from "semantic-ui-react";
import {  NavLink } from "react-router-dom";

const Navbar = ({setOpen}) => (
  <Menu inverted fixed="top">
    <Container>
      <MenuItem header as={NavLink} to='/' exact>
        <img
          alt="logo"
          style={{ marginRight: "0.7em" }}
          src={"assets/logo.png"}
        />
        Our-Event
      </MenuItem>
      <MenuItem as={NavLink} to='/event' name="Events" />
      <MenuItem>
        <Button
          positive
          inverted
          content="Create Event"
          onClick={()=> setOpen(true)}
        />
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
