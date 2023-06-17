import { redirect } from "react-router-dom";

export const getAuthToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }
  return token;
};

export const tokenLoader = () => {
  return getAuthToken();
};

/**
 * Currently there is no validation of the token,
 * we just CHECK IF IT EXISTS.
   TODO:
 * 1. Validate the token
 * 2. Add expiration date to the token
 */

// Checks if the user is logged in, if not, redirect to login page
export const checkAuth = () => {
  // We get the token from local storage
  const token = getAuthToken();

  // If there is no token, we redirect to the login page
  if (!token) {
    console.log("No token found in local storage");
    return redirect("/login");
  }
  return null;
};

// Checks if the user is logged in, if so, redirect to home page
export const isLoggedIn = () => {
  const token = getAuthToken();
  if (token) {
    return redirect("/");
  }
  return null;
};
