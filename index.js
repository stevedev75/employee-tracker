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
       'Exployees',  
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
       
     case 'Exployees':
      addEmp();
       break;  

     default:
      console.log('Invalid action: ${answer.action}');
       break;  
    }  
  });
};

// Build the above 3 mentioned functions below
// addDept
// addRole
// addEmp
// Remember to use 'console.table' for output!

// My attempt at writing the addDept function
const addDept = () => {
  inquirer
   .prompt({
     name: 'department',
      type: 'input',
       message: 'Name of new department?',   
   })
    .then

// End of addDept function attempt    

const viewData = () => {
    inquirer
     .prompt({
       name: 'action',
        type: 'rawlist',
        choices: [
          'Departments',
          'Roles',
          'Exployees',  
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
          
        case 'Exployees':
         viewEmp();
          break;  
   
        default:
         console.log('Invalid action: ${answer.action}');
          break;  
       }  
     });
   };

// Build the above 3 mentioned functions below
// viewDept
// viewRole
// viewEmp
// Remember to use 'console.table' for output!





// Build the updateData function below
// Remember to use 'console.table' for output!