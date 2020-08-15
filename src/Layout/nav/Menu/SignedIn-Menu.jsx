import React from "react";
import { Menu, Image, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../../../redux/Auth/Auth.Action";

const SignedInMenu = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <Menu.Item position="right">
      <Image
        avatar
        spaced="right"
        src={currentUser.photoURL || "/assets/user.png"}
      />
      <Dropdown pointing="top left" text={currentUser.email}>
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
            onClick={() => dispatch(signOutUser())}
            as={Link}
            to="/"
            text="Sign Out"
            icon="power"
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};
export default SignedInMenu;
