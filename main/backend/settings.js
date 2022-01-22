const Store = require("electron-store");

const store = new Store();

function isLoggedIn() {
  return store.get("isLoggedIn");
}

function login(user) {
    store.set("isLoggedIn", true);
    console.log("persist login", user);
}

function logout() {
  store.delete("isLoggedIn");
  console.log(store.get("isLoggedIn"));
}

module.exports = {
  isLoggedIn: isLoggedIn,
  login: login,
  logout: logout,
};
