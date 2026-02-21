export const signupUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const loginUser = (username, password) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (
    storedUser &&
    storedUser.username === username &&
    storedUser.password === password
  ) {
    localStorage.setItem("loggedIn", true);
    return true;
  }

  return false;
};

export const logoutUser = () => {
  localStorage.removeItem("loggedIn");
};

export const isAuthenticated = () => {
  return localStorage.getItem("loggedIn");
};
