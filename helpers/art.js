const figlet = require("figlet");
// Helper function to create a logo for the program
const art = () => figlet("Employee-Tracker", "doom", (err,rendered) => {
  if(err) throw err 
  console.log(rendered)
})
module.exports = art