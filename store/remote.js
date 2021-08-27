export const state = () => ({
  apiUrl: process.env.API_URL,

  // API service
  apiVersion: "/version",

  // User service
  login: "/login_check",
  logout: null,
  profile: "/me/user_info",

  // User list
  users: "/users",

  // Allowed users roles
  allowedRoles: ["ROLE_USER"],
});
