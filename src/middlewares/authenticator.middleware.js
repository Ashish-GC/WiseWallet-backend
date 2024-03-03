import express from "express";
import JWT from "../helpers/jwt.js";

const authenticator = (req, res, next) => {
  // Get the token from the request headers
  let token = req.headers.authorization;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  if (token.includes("Bearer")) {
    [, token] = token.split(" ");
  }

  try {
    // Verify the token
    const decoded = JWT.verifyToken(token);
    console.log(decoded);
    // Attach the decoded token to the request object
    req.user = decoded;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authenticator;
