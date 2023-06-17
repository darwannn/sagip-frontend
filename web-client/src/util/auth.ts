import jwtDecode from "jwt-decode";
import { redirect } from "react-router-dom";

type Token = {
  exp: number;
  iat: number;
  id: string;
};

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
