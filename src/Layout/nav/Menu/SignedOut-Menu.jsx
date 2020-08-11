import React from "react";
import { Menu, Button } from "semantic-ui-react";
const SignedOutMenu = ({ setAuth }) => (
  <Menu.Item position="right">
    <Button onClick={() => setAuth(true)} basic inverted content="Login" />
    <Button basic inverted content="Register" style={{ marginLeft: "0.6em" }} />
  </Menu.Item>
);
export default SignedOutMenu;
 