import React from "react";
import { Menu, Button, MenuItem } from "semantic-ui-react";

const Navbar = () => (
  <Menu inverted fixed="top">
    <MenuItem header>
        <img alt='logo' src={'assets/logo.png'} />
        Our-Event
        </MenuItem>
    <MenuItem name="Event" />
    <MenuItem>
      <Button positive inverted content="Create Event" />
    </MenuItem>
    <MenuItem position="right">
      <Button basic inverted content="Login" />
      <Button basic inverted content="Register" />
   
    </MenuItem>
  </Menu>
);
export default Navbar;
