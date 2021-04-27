const { v4: uuidv4 } = require("uuid");

// Users repository
// Pretending that this is a real database
let users = [];

const getUsers = () => {
  return users;
}

const getUserByUsername = (username) => {
  return users.find((user) => user.username === username);
};

const getUserById = (id) => {
  return users.find((user) => user.id === id);
};

const createUser = (username, password) => {
  if (getUserByUsername(username)) return false;

  users.push({
    id: uuidv4(),
    username: username,
    password: password,
  });
  return true;
};

const saveGoogleAccount = ({ googleId, username, displayName, firstName, lastName, image }) => {
  users.push({
    id: googleId,
    username: username,
    displayName: displayName,
    firstName: firstName,
    lastName: lastName,
    image: image
  });
  return getUserById(googleId);
};

const clearUsers = () => {
  users = [];
};

module.exports = {
  users,
  getUsers,
  getUserByUsername,
  getUserById,
  createUser,
  saveGoogleAccount,
  clearUsers,
};
