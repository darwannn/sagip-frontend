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
  console.log("====================================");
  console.log(decodedToken);
  console.log("====================================");
  const exp = decodedToken.exp;
  // If token is expired, return null
  if (now > exp) {
    console.log("Token expired");
    return null;
  }
  // If token is valid, return token
  return token;
};

// Checks if the user is logged in, if not, redirect to login page
export const checkAuth = () => {
  // We get the token from local storage
  const token = getAuthToken();

  // If there is no token, we redirect to the login page
  if (!token) {
    console.log("No token found in local storage");
    return redirect("/login");
  }
  // TODO: set a different error message for expired token
  return null;
};

// Checks if the user is logged in, if so, redirect to home page
export const isLoggedIn = () => {
  const token = getAuthToken();
  if (token) {
    // TODO: REDIRECT DEPENDING ON USER TYPE

    // TEMPORARY
    return redirect("/admin");
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
