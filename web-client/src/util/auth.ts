import jwtDecode from "jwt-decode";
import { redirect } from "react-router-dom";
// Types
import type { AuthType, Token } from "../types/auth";

/**
 * Get token and check if it is expired
 * */
export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  const now = new Date().getTime() / 1000;

  // If there is no token, return null
  if (!token) {
    console.log("No token found");
    return null;
  }

  const decodedToken = jwtDecode<Token>(token || "");

  const exp = decodedToken.exp;
  // If token is expired, return null
  if (now > exp) {
    console.log("Token expired");
    return null;
  }
  // If token is valid, return token
  return token;
};

// Checks if the user is logged in. If so, redirect to their respective page depending on userType.
// TODO: Refactor/combine isLoggedIn and allowedUserType functions.
export const isLoggedIn = (allowedUserTypes: string[]) => {
  const token = getAuthToken();
  if (token) {
    const decodedToken = jwtDecode<Token>(token || "");
    const tokenTarget = decodedToken.target;
    const userType = decodedToken.userType;

    /* console.log(decodedToken); */

    if (tokenTarget === "login") {
      if (allowedUserTypes.includes(userType)) {
        return redirect("/admin");
      } else {
        return redirect("/home");
      }
    }
  }
  return null;
};

// Checks if the user is allowed on the page based on their userType. If not, they will be redirected to the login page.

export const allowedUserType = (
  allowedUserType: string[],
  isTokenRequired: boolean
) => {
  console.log(allowedUserType, isTokenRequired);

  // TODO: Uncomment once all the system functionality are integrated
  /* const token = getAuthToken();
  if (token) {
    const decodedToken = jwtDecode<Token>(token || "");
    const userType = decodedToken.userType;
    if (decodedToken.target === "login") {
      if (!allowedUserType.includes(userType)) {
        return redirect("/login");
      }
    }
  } else {
    if (isTokenRequired) {
      return redirect("/login");
    }
  } */
  return null;
};

export const isInForgotPassword = (target: string) => {
  const token = getAuthToken();
  if (token) {
    const decodedToken = jwtDecode<Token>(token || "");
    if (decodedToken.target !== target) {
      return redirect("/forgot-password");
    }
  } else {
    return redirect("/forgot-password");
  }
  return null;
};

/**
 * It is usually not recommended to store tokens in local storage
 * because of XSS attacks.
 * For future improvements we can store the token in a cookie with
 * httpOnly flag set to true.
 */
// Store token in local storage
export const setAuthToken = ({ token }: AuthType) => {
  localStorage.setItem("token", token || "");
};
