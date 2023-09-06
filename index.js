const inquirer = require('inquirer');
const db = require('./db/connection');

const employeeTracker = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'prompt',
        message: 'What would you like to do?',
        choices: [
          'View Departments',
          'View Roles',
          'View Employees',
          'Add A Department',
          'Add A Role',
          'Add An Employee',
          'Update An Employee Role',
          'Log Out',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.prompt) {
        case 'View Departments':
          viewDepartments();
          break;

        case 'View Roles':
          viewRoles();
          break;

        case 'View Employees':
          viewEmployees();
          break;

        case 'Add A Department':
          addDepartment();
          break;

        case 'Add A Role':
          addRole();
          break;

        case 'Add An Employee':
          addEmployee();
          break;

        case 'Update An Employee Role':
          updateEmployeeRole();
          break;

        case 'Log Out':
          db.end();
          console.log('Good-Bye!');
          break;

        default:
          console.log('Invalid choice');
          break;
      }
    });
};

const viewDepartments = () => {
  db.query(`SELECT * FROM department`, (err, result) => {
    if (err) throw err;
    console.log('Viewing All Departments: ');
    console.table(result);
    employeeTracker();
  });
};

const viewRoles = () => {
  db.query(`SELECT * FROM role`, (err, result) => {
    if (err) throw err;
    console.log('Viewing All Roles: ');
    console.table(result);
    employeeTracker();
  });
};

const viewEmployees = () => {
  db.query(`SELECT * FROM employee`, (err, result) => {
    if (err) throw err;
    console.log('Viewing All Employees: ');
    console.table(result);
    employeeTracker();
  });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'department',
        message: 'What is the name of the department?',
        validate: (departmentInput) => {
          if (departmentInput) {
            return true;
          } else {
            console.log('Please Add A Department!');
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      db.query(`INSERT INTO department (name) VALUES (?)`, [answers.department], (err, result) => {
        if (err) throw err;
        console.log(`Added ${answers.department} to the database.`);
        employeeTracker();
      });
    });
};

const addRole = () => {
  db.query(`SELECT * FROM department`, (err, result) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'role',
          message: 'What is the name of the role?',
          validate: (roleInput) => {
            if (roleInput) {
              return true;
            } else {
              console.log('Please Add A Role!');
              return false;
            }
          },
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the salary of the role?',
          validate: (salaryInput) => {
            if (salaryInput) {
              return true;
            } else {
              console.log('Please Add A Salary!');
              return false;
            }
          },
        },
        {
          type: 'list',
          name: 'department',
          message: 'Which department does the role belong to?',
          choices: () => {
            var array = [];
            for (var i = 0; i < result.length; i++) {
              array.push(result[i].name);
            }
            return array;
          },
        },
      ])
      .then((answers) => {
        for (var i = 0; i < result.length; i++) {
          if (result[i].name === answers.department) {
            var department = result[i];
          }
        }

        db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answers.role, answers.salary, department.id], (err, result) => {
          if (err) throw err;
          console.log(`Added ${answers.role} to the database.`);
          employeeTracker();
        });
      });
  });
};

const addEmployee = () => {
  db.query(`SELECT * FROM employee, role`, (err, result) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'firstName',
          message: 'What is the employee\'s first name?',
          validate: (firstNameInput) => {
            if (firstNameInput) {
              return true;
            } else {
              console.log('Please Add A First Name!');
              return false;
            }
          },
        },
        {
          type: 'input',
          name: 'lastName',
          message: 'What is the employee\'s last name?',
          validate: (lastNameInput) => {
            if (lastNameInput) {
              return true;
            } else {
              console.log('Please Add A Last Name!');
              return false;
            }
          },
        },
        {
          type: 'list',
          name: 'role',
          message: 'What is the employee\'s role?',
          choices: () => {
            var array = [];
            for (var i = 0; i < result.length; i++) {
              array.push(result[i].title);
            }
            var newArray = [...new Set(array)];
            return newArray;
          },
        },
        {
          type: 'input',
          name: 'manager',
          message: 'Who is the employee\'s manager?',
          validate: (managerInput) => {
            if (managerInput) {
              return true;
            } else {
              console.log('Please Add A Manager!');
              return false;
            }
          },
        },
      ])
      .then((answers) => {
        for (var i = 0; i < result.length; i++) {
          if (result[i].title === answers.role) {
            var role = result[i];
          }
        }

        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.firstName, answers.lastName, role.id, answers.manager], (err, result) => {
          if (err) throw err;
          console.log(`Added ${answers.firstName} ${answers.lastName} to the database.`);
          employeeTracker();
        });
      });
  });
};

const updateEmployeeRole = () => {
  db.query(`SELECT * FROM employee, role`, (err, result) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'employee',
          message: 'Which employee\'s role do you want to update?',
          choices: () => {
            var array = [];
            for (var i = 0; i < result.length; i++) {
              array.push(result[i].last_name);
            }
            var employeeArray = [...new Set(array)];
            return employeeArray;
          },
        },
        {
          type: 'list',
          name: 'role',
          message: 'What is their new role?',
          choices: () => {
            var array = [];
            for (var i = 0; i < result.length; i++) {
              array.push(result[i].title);
            }
            var newArray = [...new Set(array)];
            return newArray;
          },
        },
      ])
      .then((answers) => {
        for (var i = 0; i < result.length; i++) {
          if (result[i].last_name === answers.employee) {
            var name = result[i];
          }
        }

        for (var i = 0; i < result.length; i++) {
          if (result[i].title === answers.role) {
            var role = result[i];
          }
        }

        db.query(`UPDATE employee SET ? WHERE ?`, [{ role_id: role.id }, { last_name: name.last_name }], (err, result) => {
          if (err) throw err;
          console.log(`Updated ${answers.employee}'s role in the database.`);
          employeeTracker();
        });
      });
  });
};

employeeTracker(); // Start the application

module.exports = {};
