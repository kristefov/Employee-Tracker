const { prompt } = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "123456789",
  database: "registrar_db",
});

db.connect((err) => {
  if (err) {
    console.log(err);
    return "There was an error connecting to the database.";
  }
  choices();
});

const choices = () => {
  prompt({
    name: "choice",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "View all employees by department",
      "View all employees by manager",
      "Remove employee",
      "Update employee manager",
    ],
  }).then((answers) => {
    if (answers.choice === "View all departments") {
      db.query("SELECT * FROM departments", (err, result) => {
        console.table(result);
        choices();
      });
    } else if (answers.choice === "View all roles") {
      db.query("SELECT * FROM roles", (err, result) => {
        console.table(result);
        choices();
      });
    } else if (answers.choice === "View all employees") {
      db.query("SELECT * FROM employees", (err, result) =>
        console.table(result)
      );
      choices();
    } else if (answers.choice === "Add a department") {
      prompt({
        name: "department",
        type: "input",
        message: "What is the name of the department?",
        validate: (answer) => {
          if (answer != "") {
            return true;
          }
          return "Please add the name of the department!";
        },
      }).then((answers) => {
        console.log(answers);
        db.query(
          "INSERT INTO departments (department_name) VALUES (?)",
          [answers.department],
          (err, result) => {
            console.log("Department successfully saved");
            choices();
          }
        );
      });
    } else if (answers.choice === "Add a role") {
      db.query("SELECT * FROM departments", (err, result) => {
        result = result.map((departments) => {
          return {
            name: departments.department_name,
            value: departments.id,
          };
        });
        prompt([
          {
            name: "title",
            type: "input",
            message: "What is the name of the role?",
            validate: (answer) => {
              if (answer != "") {
                return true;
              }
              return "Please add the name of the role!";
            },
          },
          {
            name: "salary",
            type: "input",
            message: "What is the salary for the new role?",
            validate: (answer) => {
              if (isNaN(answer)) {
                return false, "Please add the salary for the new role!";
              }
              return true;
            },
          },
          {
            name: "department",
            type: "list",
            message: "Select a department?",
            choices: result,
          },
        ]).then((answers) => {
          db.query(
            "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
            [answers.title, answers.salary, answers.department],

            (err, result) => {
              console.log(answers);
              console.log("Role successfully saved");
              choices();
            }
          );
        });
      });
    } else if (answers.choice === "Add an employee") {
      db.query("SELECT * FROM roles", (err, resultRoles) => {
        resultRoles = resultRoles.map((roles) => {
          
          return { name: roles.title, value: roles.id };
        });
        db.query("SELECT first_name, last_name FROM employees WHERE manager_id = NOT NULL", (err,result) => {
          console.log(result)
        }) 
      } 
      );
    }
  });
};
