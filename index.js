// index.js

const mysql = require('mysql');
const inquirer = require('inquirer');
//const cTable = require('console.table');

const connection = mysql.createConnection({
 host: 'localhost',
 
 port: 3306,

 user:'root',

 password:'',
 database:'employee_DB',
});

connection.connect((err) => {
 if (err) throw err;
 runSearch();   
});

const runSearch = () => {
  inquirer
   .prompt({
     name:'action',
      type: 'rawlist',
       message: 'What would you like to do?',
       choices: [
        'Add departments, roles, or employees',
        'View departments, roles, or employees',
        'Update employee roles',
        'Exit',   
       ], 
   })  
   .then((answer) => {
    switch (answer.action) {
     case 'Add departments, roles, or employees':
      addData();
       break;
       
     case 'View departments, roles, or employees':
      viewData();
       break;
       
     case 'Update employee roles':
      updateData();
       break;

    case 'Exit':
     console.log("Bye Bye!");
     connection.end();
      break;
       
     default:
      console.log('Invalid action: ${answer.action}');
       break;  
     }  
   });
};

const addData = () => {
 inquirer
  .prompt({
    name: 'action',
     type: 'rawlist',
     choices: [
       'Departments',
       'Roles',
       'Employees',  
     ],
  })
  .then((answer) => {
    switch (answer.action) {
     case 'Departments':
      addDept();
       break;
       
     case 'Roles':
      addRole();
       break;
       
     case 'Employees':
      addEmp();
       break;  

     default:
      console.log('Invalid action: ${answer.action}');
       break;  
    }  
  });
};

// The addDept function
const addDept = () => {
  inquirer
   .prompt({
     name: 'department',
      type: 'input',
       message: 'Name of new department?',   
   })
   .then(function(res) {
     const department = res.department;
     const query = `INSERT INTO department (name) VALUE ("${department}")`; // JOIN stuff goes in here(?) or at least these typs of queries //
      connection.query(query, function(err, res) {
       if (err) throw err;
       console.log("Department added!"); 
      runSearch();
    });
  });
}
// End of addDept function    

// The addRole function
const addRole = () => {
  inquirer
   .prompt([
     {
     name: 'title',
      type: 'input',
       message: 'Name of new role title?',   
     },

     {
     name: 'salary',
      type: 'input',
       message: 'Salary of the new role?',   
     },

     {
      name: 'department_id',
       type: 'input',
        message: 'Department ID of the new role?',   
     },
    ])
     .then(function(res) {
      const title = res.title;
      const salary = res.salary;
      const department_id = res.department_id;
      const query = `INSERT INTO role (title, salary, department_id) VALUE("${title}", "${salary}", "${department_id}")`;
      connection.query(query, function(err, res) {
        if (err) throw err;
        console.log("Role added!");
      runSearch();
    });
  })
};
// End of addDept function 

// The addEmp function
const addEmp = () => {
  inquirer
   .prompt([
     {
     name: 'first_name',
      type: 'input',
       message: 'First Name of new employee?',   
     },

     {
     name: 'last_name',
      type: 'input',
       message: 'Last name of new employee?',   
     },

     {
      name: 'role_id',
       type: 'input',
        message: 'Role ID of new employee?',   
     },

     {
      name: 'manager_id',
       type: 'input',
        message: 'Manager ID of new employee?',   
     },
    ])
    .then(function(res) {
      const first_name = res.first_name;
      const last_name = res.last_name;
      const role_id = res.role_id;
      const manager_id = res.manager_id;
      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE("${first_name}", "${last_name}", "${role_id}", "${manager_id}")`;
      connection.query(query, function(err, res) {
        if (err) throw err;
        console.log("Employee added!");
      runSearch();
    });
  });
}
// End of addDept function

//Beginning of viewData function

const viewData = () => {
    inquirer
     .prompt({
       name: 'action',
        type: 'rawlist',
        choices: [
          'Departments',
          'Roles',
          'Employees',  
        ],
     })
     .then((answer) => {
       switch (answer.action) {
        case 'Departments':
         viewDept();
          break;
          
        case 'Roles':
         viewRole();
          break;
          
        case 'Employees':
         viewEmp();
          break;  
   
        default:
         console.log('Invalid action: ${answer.action}');
          break;  
       }  
     });
   };
// End of ViewData function


// Beginning of viewDept function
function viewDept() {
 var query = "SELECT * FROM department";
  connection.query(query, function(err, res) {
   console.log(`Departments:`)
    res.forEach(department => {
     console.table(res);
      })
      runSearch();
      });
    };

// End of viewDept function


// Beginning of viewRole function
function viewRole() {
 var query = "SELECT * FROM role";
  connection.query(query, function(err, res) {
   console.log(`Roles:`)
    res.forEach(role => {
     console.table(res);
      })
      runSearch();
      });
   };
// End of viewRole function

// Beginning of viewEmp function
function viewEmp() {
 var query = "SELECT * FROM employee";
  connection.query(query, function(err, res) {
   console.log(`Employee:`)
    res.forEach(employee => {
     console.table(res);
      })
      runSearch();
      });
   };
// End of viewEmp function

// Beginning of updateData function

//First, get the employee from the employee table

// Next, ask user for a role 
          

// How do I do the JOINS??
