// Bring in all helpers and np
const { prompt } = require("inquirer");
const db = require("./config/connection");
const { exit, clear } = require("./helpers/exit");
const art = require("./helpers/art");
// Connection to the database
db.connect((err) => {
  if (err) {
    console.log(err);
    return "There was an error connecting to the database.";
  }
  choices();
});
// Ascii logo art
art();
// Choices for user to make searches
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
      "View employees by manager",
      "View employees by department",
      "Delete employee",
      "Exit",
    ],
  }).then((answers) => {
    // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //
    // This option will present a table with all departments
    if (answers.choice === "View all departments") {
      db.query(
        `SELECT id AS "ID", department_name AS "Department Name" FROM departments`,
        (err, result) => {
          if (err) throw err;
          // This will clear the console from previous results
          clear(true);
          art();
          // This will present a table with the results
          console.table(result);
          // This will start the program again to give you options until you choose exit
          choices();
        }
      );
      // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //
      // This option will present a table with all roles
    } else if (answers.choice === "View all roles") {
      db.query(
        "SELECT  roles.id AS 'ID', roles.title AS 'Title', departments.department_name AS 'Department Name', roles.salary AS 'Salary' FROM roles  JOIN departments ON roles.department_id = departments.id",
        (err, result) => {
          if (err) throw err;
          clear(true);
          art();
          console.table(result);
          choices();
        }
      );
      // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //
      // This option will present a table with all employees
    } else if (answers.choice === "View all employees") {
      db.query(
        `SELECT 
      employees.id AS "ID", employees.first_name AS "First Name", employees.last_name AS "Last Name", roles.title AS "Title", departments.department_name AS "Department Name", roles.salary AS "Salary", 
      CONCAT(manager.first_name, " ", manager.last_name) AS "Manager"
      FROM employees AS employees
      JOIN employees AS manager ON employees.manager_id = manager.id
      JOIN roles ON employees.role_id = roles.id
      JOIN departments ON roles.department_id = departments.id`,
        (err, result) => {
          if (err) throw err;
          clear(true);
          art();
          console.table(result);
          choices();
        }
      );
      // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //
      // This choice will give you an option to add new department
    } else if (answers.choice === "Add a department") {
      clear(true);
      art();
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
        db.query(
          "INSERT INTO departments (department_name) VALUES (?)",
          [answers.department],
          (err, result) => {
            if (err) throw err;
            clear(true);
            art();
            console.log("Department successfully saved");
            choices();
          }
        );
      });
      // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //
      // This choice will give you option to add new role
    } else if (answers.choice === "Add a role") {
      clear(true);
      art();
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
              if (err) throw err;
              clear(true);
              art();
              console.log("Role successfully saved");
              choices();
            }
          );
        });
      });
      // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //
      // This choice will give you option to add new employee
    } else if (answers.choice === "Add an employee") {
      clear(true);
      art();
      db.query("SELECT * FROM roles", (err, resultRoles) => {
        resultRoles = resultRoles.map((roles) => {
          return {
            name: roles.title,
            value: roles.id,
          };
        });
        db.query(
          "SELECT id, first_name, last_name FROM employees",
          (err, resultEmployees) => {
            resultEmployees = resultEmployees.map((emp) => {
              return {
                name: emp.first_name + " " + emp.last_name,
                value: emp.id,
              };
            });
            prompt([
              {
                name: "first",
                type: "input",
                message: "What is the first name of the employee?",
                validate: (answer) => {
                  if (answer != "") {
                    return true;
                  }
                  return "Please add the name for the employee!";
                },
              },
              {
                name: "last",
                type: "input",
                message: "What is the last name of the employee?",
                validate: (answer) => {
                  if (answer != "") {
                    return true;
                  }
                  return "Please add the last name for the employee!";
                },
              },
              {
                name: "role",
                type: "list",
                message: "Select a role?",
                choices: resultRoles,
              },
              {
                name: "manager",
                type: "list",
                message: "Select a Manager?",
                choices: resultEmployees,
              },
            ]).then((answers) => {
              db.query(
                "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
                [answers.first, answers.last, answers.role, answers.manager],
                (err, result) => {
                  if (err) throw err;
                  clear(true);
                  art();
                  console.log("Employee successfully saved");
                  choices();
                }
              );
            });
          }
        );
      });
      // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //
      // This choice will give you option to update existing employee
    } else if (answers.choice === "Update an employee role") {
      clear(true);
      art();
      db.query("SELECT * FROM employees", (err, resultUpdate) => {
        resultUpdate = resultUpdate.map((emp) => {
          return {
            name: emp.first_name + " " + emp.last_name,
            value: emp.id,
          };
        });
        db.query("SELECT * FROM roles", (err, resultRole) => {
          resultRole = resultRole.map((role) => {
            return {
              name: role.title,
              value: role.id,
            };
          });
          prompt({
            name: "employee",
            type: "list",
            message: "Select employee to update?",
            choices: resultUpdate,
          }).then((answersEmployee) => {
            prompt({
              name: "role",
              type: "list",
              message: "Select new role",
              choices: resultRole,
            }).then((answersRoles) => {
              db.query(
                "UPDATE employees SET role_id = (?) WHERE id = (?)",
                [answersRoles.role, answersEmployee.employee],
                (err, result) => {
                  if (err) throw err;
                  clear(true);
                  console.log("Employee role have been successfully updated");
                  choices();
                }
              );
            });
          });
        });
      });
      // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //
      // This option will present a table with all employees by manager
    } else if (answers.choice === "View employees by manager") {
      db.query(
        `SELECT  employees.first_name, employees.last_name, employees.id, employees.manager_id, CONCAT (manager.first_name, " ", manager.last_name) AS "Manager" FROM employees LEFT JOIN employees AS manager ON employees.manager_id = manager.id ORDER BY manager`,
        (err, resultsManager) => {
          resultsManager = resultsManager.map((m) => {
            return {
              name: m.first_name + " " + m.last_name,
              value: m.id,
            };
          });
          prompt({
            name: "manager",
            type: "list",
            message: "Select manager",
            choices: resultsManager,
          }).then((answer) => {
            db.query(
              `SELECT employees.id AS "ID", employees.first_name AS "First Name", employees.last_name AS "Last Name", CONCAT (manager.first_name, " ", manager.last_name) AS "Manager" FROM employees JOIN employees AS manager ON employees.manager_id = manager.id WHERE employees.manager_id = ${answer.manager} OR employees.manager_id IS NULL`,
              (err, results) => {
                if (err) throw err;
                clear(true);
                art();
                console.table(results);
                choices();
              }
            );
          });
        }
      );
      // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //
      // This option will present you a table with all employees by department
    } else if (answers.choice === "View employees by department") {
      db.query(`SELECT * FROM departments`, (err, resultsDepartments) => {
        if (err) throw err;
        resultsDepartments = resultsDepartments.map((m) => {
          return {
            name: m.department_name,
            value: m.id,
          };
        });
        prompt({
          name: "department",
          type: "list",
          message: "Select department",
          choices: resultsDepartments,
        }).then((answer) => {
          db.query(
            `SELECT employees_roles.id, first_name, last_name, title, department_name  FROM (SELECT employees.id, first_name, last_name, title, department_id FROM employees JOIN roles ON employees.role_id = roles.id WHERE roles.department_id = ?) AS employees_roles JOIN departments ON employees_roles.department_id = departments.id`,
            [answer.department],
            (err, results) => {
              if (err) throw err;
              clear(true);
              art();
              console.table(results);
              choices();
            }
          );
        });
      });
      // This choice will hive you option to delete existing employee
    } else if (answers.choice === "Delete employee") {
      db.query("SELECT * FROM employees", (err, result) => {
        if (err) throw err;
        result = result.map((d) => {
          return {
            name: d.first_name + " " + d.last_name,
            value: d.id,
          };
        });
        prompt({
          name: "delete",
          type: "list",
          message: "Select and employee to delete",
          choices: result,
        }).then((answers) => {
          db.query(
            `DELETE FROM employees WHERE id = ${answers.delete}`,
            (err, result) => {
              if (err) throw err;
              clear(true);
              console.log("Employee successfully deleted");
              art();
              choices();
            }
          );
        });
      });
    } else {
      // This function will close the program
      exit();
    }
  });
};
