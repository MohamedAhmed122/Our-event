import React from "react";
import { Menu, Image, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {useSelector } from "react-redux";

import { SignOut } from "../../../firebase/firebaseService";

const SignedInMenu = () => {
  
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <Menu.Item position="right">
      <Image
        avatar
        spaced="right"
        src={currentUser.photoURL || "/assets/user.png"}
      />
      <Dropdown pointing="top left" text={currentUser.displayName || currentUser.email }>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="/createEvent"
            text="Create Event"
            icon="plus"
          />
       
          <Dropdown.Item as={Link} to={`/profile/${currentUser.uid}`} text="My Profile" icon="user" />
          <Dropdown.Item
            as={Link}
            to="/settings"
            text="Settings"
            icon="settings"
          />
          <Dropdown.Item
            onClick={()=> SignOut()}
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
