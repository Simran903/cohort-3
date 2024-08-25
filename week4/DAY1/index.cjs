// import chalk from 'chalk'

// console.log(chalk.blue('Hello, world!'));
// console.log(chalk.red.bold('This is an error message.'));
// console.log(chalk.green.underline('This is a success message.'));

// import { Command } from "commander";
// import fs from "fs";

// const program = new Command();

// program
//   .name("counter")
//   .description("CLI to do file based tasks")
//   .version("0.8.0");

// program
//   .command("count")
//   .argument("<file>", "file to count")
//   .action((file) => {
//     fs.readFile(file, "utf-8", (err, data) => {
//       if (err) console.log(err);
//       else {
//         const words = data.split(" ").length;
//         console.log(`There are ${words} words in ${file}`);
//       }
//     });
//   });

// program.parse();

const { program } = require('commander');
const fs = require('fs-extra');
const path = require('path');

const filePath = path.join(__dirname, 'todos.json');

// Ensure the todos.json file exists
const initializeTodosFile = () => {
    if (!fs.existsSync(filePath)) {
        fs.writeJsonSync(filePath, []);
    }
};

// Load todos from the file
const loadTodos = () => {
    initializeTodosFile();
    return fs.readJsonSync(filePath);
};

// Save todos to the file
const saveTodos = (todos) => {
    fs.writeJsonSync(filePath, todos, { spaces: 2 });
};

// Add a todo
program
    .command('add <todo>')
    .description('Add a new todo')
    .action((todo) => {
        const todos = loadTodos();
        todos.push({ task: todo, done: false });
        saveTodos(todos);
        console.log(`Added: "${todo}"`);
    });

// Delete a todo
program
    .command('delete <index>')
    .description('Delete a todo by index')
    .action((index) => {
        const todos = loadTodos();
        if (index < 1 || index > todos.length) {
            console.log("Invalid index");
        } else {
            const [deleted] = todos.splice(index - 1, 1);
            saveTodos(todos);
            console.log(`Deleted: "${deleted.task}"`);
        }
    });

// Mark a todo as done
program
    .command('done <index>')
    .description('Mark a todo as done by index')
    .action((index) => {
        const todos = loadTodos();
        if (index < 1 || index > todos.length) {
            console.log("Invalid index");
        } else {
            todos[index - 1].done = true;
            saveTodos(todos);
            console.log(`Marked as done: "${todos[index - 1].task}"`);
        }
    });

// List all todos
program
    .command('list')
    .description('List all todos')
    .action(() => {
        const todos = loadTodos();
        if (todos.length === 0) {
            console.log("No todos found");
        } else {
            todos.forEach((todo, index) => {
                console.log(`${index + 1}. [${todo.done ? 'x' : ' '}] ${todo.task}`);
            });
        }
    });

program.parse(process.argv);
