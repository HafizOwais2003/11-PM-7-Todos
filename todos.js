// import inquirer from "inquirer";
// let todos = []; //==> As a shoper
// let condition = true;
// while (condition) {
//     let todoQuestions = await inquirer.prompt([
//         {
//             name: "firstQuestion",
//             type: "input",
//             message: "What would you like to add in your todos?"
//         },
//         {
//             name: 'secondQuestion',
//             type: "confirm",
//             message: 'Would you like to add more in your todos?',
//             default: "true"
//         }
//     ]);
//     todos.push(todoQuestions.firstQuestion);
//     console.log(todos);
//     condition = todoQuestions.secondQuestion;
// }

import inquirer from "inquirer";

let todos = [];

async function main() {
    let condition = true;

    while(condition) {
        let choice = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'Choose an action:',
            choices: ['Add', 'Read', 'Delete', 'Update', 'Exit']
        });

        switch(choice.action) {
            case 'Add':
                await addTask();
                break;
            case 'Read':
                readTasks();
                break;
            case 'Delete':
                await deleteTask();
                break;
            case 'Update':
                await updateTask();
                break;
            case 'Exit':
                condition = false;
                break;
        }
    }
}

async function addTask() {
    let addTask = await inquirer.prompt({
        name:'todo',
        type:'input',
        message:"Enter the task you want to add:"
    });

    todos.push(addTask.todo);
    console.log("Task added successfully!");
}

function readTasks() {
    console.log("\nYour Todos:");
    todos.forEach((todo, index) => {
        console.log(`${index + 1}. ${todo}`);
    });
    console.log();
}

async function deleteTask() {
    let deleteTask = await inquirer.prompt({
        name:'index',
        type:'input',
        message:"Enter the index of the task you want to delete:"
    });

    let index = parseInt(deleteTask.index) - 1;
    if(index >= 0 && index < todos.length) {
        todos.splice(index, 1);
        console.log("Task deleted successfully!");
    } else {
        console.log("Invalid index!");
    }
}

async function updateTask() {
    let updateTask = await inquirer.prompt({
        name:'index',
        type:'input',
        message:"Enter the index of the task you want to update:"
    });

    let index = parseInt(updateTask.index) - 1;
    if(index >= 0 && index < todos.length) {
        let newTask = await inquirer.prompt({
            name:'todo',
            type:'input',
            message:`Enter the new task for index ${index + 1}:`
        });

        todos[index] = newTask.todo;
        console.log("Task updated successfully!");
    } else {
        console.log("Invalid index!");
    }
}

main();