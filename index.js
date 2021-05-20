// index.js

const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

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


// USE THE CONSOLE.TABLE before we move ahead??
// If so, when do I do the JOINs?? -- it must be before this step, right?

// Build the above 3 mentioned functions below
// addDept X
// addRole X
// addEmp X
// Remember to use 'console.table' for output!

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
     const query = `INSERT INTO department (name) VALUES("${department}")`;
      connection.query(query, function(err, res) {
       if (err) throw err;
     //   console.table(????) // How do I "print out the updated table?"
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
        // console.table(????) // How do I "print out the updated table?"
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
      // console.table(????) // How do I "print out the updated table?"
      runSearch();
    });
  });
}
// End of addDept function 

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
  
// Build the above 3 mentioned functions below
// viewDept X
// viewRole
// viewEmp
// Remember to use 'console.table' for output!

// Beginning of viewDept function

function viewDept() {
  var query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
        console.log(`DEPARTMENTS:`)
      res.forEach(department => {
          // console.log(`ID: ${department.id} | Name: ${department.name}`)
           // console.table(????) // How do I "print out the updated table?"
      })
      runSearch();
      });
  };

// End of viewDept function






// Build the updateData function below
