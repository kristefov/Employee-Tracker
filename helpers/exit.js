const clear = require('console-clear');
const db = require("../db/connection")


const exit = () => {
  db.end();
  clear(true);
  console.log("Goodbye")
};



module.exports = {
  exit,
  clear,
}