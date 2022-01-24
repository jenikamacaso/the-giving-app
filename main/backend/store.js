const Store = require("electron-store");

const store = new Store();

isLoggedIn = async () => {
  return store.get("isLoggedIn");
};

login = async (user) => {
  console.log("Login!");
  store.set("isLoggedIn", true);
  store.set("user", user);
};

logout = async () => {
  console.log("Logout!");
  store.delete("isLoggedIn");
  store.delete("user");
};

module.exports = {
  isLoggedIn: isLoggedIn,
  login: login,
  logout: logout,
};
