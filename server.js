const mysql = require('mysql')
const inquirer = require('inquirer');
const { restoreDefaultPrompts } = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: '',
    database: 'employee_db',
});


//callback function to fetch data based on department choice
const whichDepartment = (data) => {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, employee.role_id FROM department RIGHT JOIN employee ON department.id = employee.department_id WHERE ?', data,
        (err, res) => {
            if (err) throw err;
            console.table(res);
            init()
        },
    )
}
//function to view employees based on department
const viewDepartment = () => {
    connection.query('SELECT name FROM department',
        (err, res) => {
            if (err) throw err;
            choices = res
            inquirer.prompt({
                type: 'rawlist',
                message: `Please pick which department's employees to view`,
                choices,
                name: 'name'
            }).then((answer) => {
                console.log(answer)
                whichDepartment(answer)
            });
        });
}


//function to view managers based on role choice
const viewManagers = () => {
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name FROM employee WHERE role_ID = "11"`,
        (err, res) => {
            if (err) throw err;
            console.table(res)
            init()
        });
}
//function to view analysts based on role choice
const viewanalysts = () => {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, department.name FROM employee RIGHT JOIN department on employee.department_id = department.id WHERE role_ID = "12"',
        (err, res) => {
            if (err) throw err;
            console.table(res)
            init()
        });
}
//function to view interns based on role choice
const viewinterns = () => {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, department.name FROM employee RIGHT JOIN department on employee.department_id = department.id WHERE role_ID = "13"',
        (err, res) => {
            if (err) throw err;
            console.table(res)
            init()
        });
}
//function to view employees based on role
const viewRole = () => {
    const choices = [
        { name: 'View all managers', value: viewManagers },
        { name: 'View all analysts', value: viewanalysts },
        { name: 'View all interns', value: viewinterns },
        { name: 'Exit to main menu', value: init },
        { name: 'EXIT', value: exit }
    ];
    inquirer.prompt({
        type: 'rawlist',
        message: 'Please pick what you would like to view',
        choices,
        name: 'option'
    }).then((answer) => {
        answer.option();
    });
};

//function to view all employees
const viewEmployees = () => {
    connection.query(`
    SELECT 
    employee.id, employee.first_name, employee.last_name,
    employee.role_id, department.name 
    FROM employee 
    RIGHT JOIN department ON employee.department_id = department.id`,
        (err, res) => {
            if (err) throw err;
            console.table(res)
            init()
        });
}

//function to let user choose what they want to view (all, deparmtent or role)
const view = () => {
    const choices = [
        { name: 'View all employees', value: viewEmployees },
        { name: 'View employees by department', value: viewDepartment },
        { name: 'View employees by role', value: viewRole },
        { name: 'Exit to main menu', value: init },
        { name: 'EXIT', value: exit }
    ];
    inquirer.prompt({
        type: 'rawlist',
        message: 'Please pick what you would like to view',
        choices,
        name: 'option'
    }).then((answer) => {
        answer.option();
    });
};

//function to add a new department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the new departments name?',
        }
    ]).then((answer) => {
        const insert = `INSERT INTO department (name) VALUES 
('${answer.name}')`

        connection.query(insert, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted")
        });

        init()
    })
}

//function to add a new role
const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the new title?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is that title\'s salary?',
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the department id?',
        }
    ]).then((answer) => {
        const insert = `INSERT INTO role (title, salary, department_id) VALUES 
('${answer.title}', '${answer.salary}', '${answer.department_id}')`

        connection.query(insert, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted")
        });
        init()
    })
}


//function to add a new employee
const addEmployees = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is their first name?',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is their last name?',
        },
        {
            type: 'rawlist',
            name: 'role_id',
            message: 'What is their role id (11 = Manager, 12 = Analyst and 13 = Intern)?',
            choices: ['11', '12', '13']
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What is their department id?',
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'What is their manager id? (If no manager insert 0)',
        }
    ]).then((answer) => {
        const insert = `INSERT INTO employee (first_name, last_name, role_id, department_id, manager_id) VALUES 
('${answer.first_name}', '${answer.last_name}', '${answer.role_id}','${answer.department_id}', '${answer.manager_id}' )`

        connection.query(insert, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted to employee");
        })

        if (answer.role_id === 11) {
            const insertrole = `INSERT INTO role (title, department_id, salary) VALUES 
        ('Manager', '${answer.department_id}','100000')`

        connection.query(insertrole, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted to role");
            init()
        });
        } else if (answer.role_id === 12) {
            const insertrole = `INSERT INTO role (title, department_id, salary) VALUES 
        ('Analyst', '${answer.department_id}','75000')`

        connection.query(insertrole, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted to role");
            init()
        });
        } else {
            const insertrole = `INSERT INTO role (title, department_id, salary) VALUES 
        ('Intern', '${answer.department_id}','35000')`

        connection.query(insertrole, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted to role");
            init()
        });
        }
        
        
    })
}

//function to let user choose what they want to add (employee, deparmtent or role)
const add = () => {
    const choices = [
        { name: 'Add an employee', value: addEmployees },
        { name: 'Add an department', value: addDepartment },
        { name: 'Add an role', value: addRole },
        { name: 'Exit to main menu', value: init },
        { name: 'EXIT', value: exit }
    ];
    inquirer.prompt({
        type: 'rawlist',
        message: 'Please pick what you would like to view',
        choices,
        name: 'option'
    }).then((answer) => {
        answer.option();
    });
}

//Function that lets you pick what value you would like to update
const updatePrompt = (answer) => {
    const updateID = answer.name.split(" ")[0]
    return inquirer.prompt([
        {
            type: 'list',
            name: 'column',
            message: 'Please pick what you would like to update',
            choices: ['first_name', 'last_name', 'role_id', 'department_id', 'manager_id'],
        },
        {
            type: 'input',
            name: 'updatevalue',
            message: 'What is the new value?',
        }
    ]).then((answer) => {
        const sql = `UPDATE employee 
    SET ${answer.column} = '${answer.updatevalue}' 
    WHERE id = ${updateID}`

    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
        init()
    })
});
}

//Function that lets you choose what employee you want to update
const updateEmployee = () => {
    connection.query('SELECT first_name, last_name, id FROM employee',
        (err, res) => {
            if (err) throw err;
            choices = []
            for (let i = 0; i < res.length; i++) {
                let myName = `${res[i].id} ${res[i].first_name}  ${res[i].last_name}`
                choices.push(myName)
            }
            inquirer.prompt({
                type: 'rawlist',
                message: `Please pick which department's employees to view`,
                choices,
                name: 'name'
            }).then((answer) => {
                updatePrompt(answer)
                    
            });
        });
}


const exit = () => {
    process.exit();
};

//starter function (main menu)
const init = () => {
    const choices = [
        { name: 'Add departments, roles, employees', value: add },
        { name: 'View departments, roles, employees', value: view },
        { name: 'Update employee roles', value: updateEmployee },
        { name: 'EXIT', value: exit }
    ];
    inquirer.prompt({
        type: 'rawlist',
        message: 'Please pick an option or exit',
        choices,
        name: 'option'
    }).then((answer) => {
        answer.option();
    });
};

const mystart = () => {
    connection.connect((err) => {
        if (err) throw err;
        init();
    });
}

mystart()



const myJoin = () => {
    connection.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.department_id, department.name 
    FROM employee 
    RIGHT JOIN role ON role.id = employee.id 
    RIGHT JOIN department ON department.id = role.department_id WHERE title = "Manager"`,
        (err, res) => {
            if (err) throw err;
            console.table(res)
            connection.end();
        });
};

//myJoin()

const test = () => {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee. FROM employee RIGHT JOIN department on employee.department_id = department.id WHERE role_ID = "13"',
        (err, res) => {
            if (err) throw err;
            let myDepartments = res

        });
    //init()
}

const tester = () => {
    connection.query('SELECT name FROM department',
        (err, res) => {
            if (err) throw err;
            choices = res
            inquirer.prompt({
                type: 'rawlist',
                message: `Please pick which department's employees to view`,
                choices,
                name: 'name'
            }).then((answer) => {
                console.log(answer)
                whichDepartment(answer)
            });
        });
}

const who = () => {
    connection.query('SELECT first_name, last_name, id, department_id FROM employee WHERE role_id = 11',
        (err, res) => {
            if (err) throw err;
            myArray = []
            for (let i = 0; i < res.length; i++) {
                let myName = `${res[i].first_name}  ${res[i].last_name}`
                myArray.push(myName)
            }
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'What is their first name?',
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'What is their last name?',
                },
                {
                    type: 'rawlist',
                    name: 'role_id',
                    message: 'What is their role id (11 = Manager, 12 = Analyst and 13 = Intern)?',
                    choices: ['11', '12', '13']
                },
                {
                    type: 'rawlist',
                    name: 'role_id',
                    message: 'What is their manager\'s id?',
                    choices: myArray
                }
            ]).then((answer) => {
                console.log(answer)
            });
        });
}




