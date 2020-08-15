import { SIGN_IN_USER, SIGN_OUT_USER } from "./Auth.Type";

export const signInUser = (user) => ({
  type: SIGN_IN_USER,
  payload: user,
});

export const signOutUser = () => ({
  type: SIGN_OUT_USER,
});