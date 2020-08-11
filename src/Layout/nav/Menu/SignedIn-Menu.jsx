import React from "react";
import { Menu, Image, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";

const SignedInMenu = ({ setAuth }) => (
  <Menu.Item position="right">
    <Image avatar spaced="right" src="/assets/user.png" />
    <Dropdown pointing="top left" text="Mohamed">
      <Dropdown.Menu>
        <Dropdown.Item
          as={Link}
          to="/createEvent"
          text="Create Event"
          icon="plus"
        />
        <Dropdown.Item text="My Events" icon="calendar" />
        <Dropdown.Item text="My Friends" icon="users" />
        <Dropdown.Item text="My Profile" icon="user" />
        <Dropdown.Item
          as={Link}
          to="/settings"
          text="Settings"
          icon="settings"
        />
        <Dropdown.Item
          onClick={() => setAuth(false)}
          as={Link}
          to="/"
          text="Sign Out"
          icon="power"
        />
      </Dropdown.Menu>
    </Dropdown>
  </Menu.Item>
);
export default SignedInMenu;
