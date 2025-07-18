// utils/constants.ts

export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const MESSAGES = {
  USER_REGISTERED: "User registered successfully.",
  USER_EXISTS: "User already exists.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  LOGIN_SUCCESS: "Login successful.",
  SERVER_ERROR: "An error occurred.",
  UNAUTHORIZED: "Unauthorized.",
  REGISTRATION_FAILED: "Registration failed.",
  LOGIN_FAILED: "Login failed.",
  NO_TOKEN: "Access denied. No token provided.",
  INVALID_TOKEN: "Invalid or expired token.",
  DASHBOARD_SUCCESS: "Dashboard data fetched successfully",
};
