const figlet = require("figlet");

const art = () => figlet("Employee-Tracker", "doom", (err,rendered) => {
  if(!err) console.log(rendered)
})
module.exports = art