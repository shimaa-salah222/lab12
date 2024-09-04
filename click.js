const { program } = require("commander");
const fs = require("fs");
const path = require("path");

program
  .name("NodeJs")
  .description("CLI for Todo List")
  .version("1.0.0");

program
  .command("add")
  .option('-t, --title <string>', "title")
  .option('-s, --status <string>', "status","todo")
  .action((options) => {
    const todostr = fs.readFileSync(path.join(__dirname, "todo.json"), "utf8");
    let todol = JSON.parse(todostr);

    const title = options.title;
    const status = options.status;

    const newList = {
      id: Date.now(),
      title: title,
      status: status,
    };

  });

program
  .command("edit")
  .option("-i, --id <number>", "id")
  .option("-t, --title <string>", "title")
  .option("-st, --status <string>", "status","todo")
  .action((options) => {
    const todostr = fs.readFileSync(path.join(__dirname, "todo.json"), "utf8");
    let todol = JSON.parse(todostr);

    const index = todol.findIndex((todo) => todo.id === parseInt(options.id));
    if (index === -1) {
      console.error(`Error: Todo item with ID ${options.id} not found`);
      process.exit(1);
    }

  });

program
  .command("delete")
  .option("-i, --id <number>", "id")
  .action((options) => {
    const todostr = fs.readFileSync(path.join(__dirname, "todo.json"), "utf8");
    let todol = JSON.parse(todostr);

    const index = todol.findIndex((todo) => todo.id === parseInt(options.id));
    if (index === -1) {
      console.error(`Error: Todo item with ID ${options.id} not found`);
      process.exit(1);
    }

    todol.splice(index, 1);
    fs.writeFileSync(path.join(__dirname, "todo.json"), JSON.stringify(todol, null, 2));
  });

program.parse();
