// node package with option to clear the console
const clear = require("console-clear");
const db = require("../config/connection");
// Helper function to quit the program
const exit = () => {
  db.end();
  clear(true);
  console.log("Goodbye");
};

module.exports = {
  exit,
  clear,
};
