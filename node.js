const fs = require("fs");
const todostr = fs.readFileSync("./todo.json", "utf-8");
let todol = JSON.parse(todostr);

const [,, action] = process.argv;

switch (action) {
  case "add": {
const [,,,, title, ,status] = process.argv;
    const validStatus = ["todo", "onprogress", "done"].includes(status);
    if (!validStatus) {
      console.error(`Error: Invalid status "${status}". Must be one of "todo", "onprogress", or "done".`);
      process.exit(1);
    }
    const newList = {
      id: Date.now(),
      title: title,
      status: status
    };
    todol.push(newList);
    fs.writeFileSync("./todo.json", JSON.stringify(todol, null, 2));
    break;
  }


  case "edit": {
    const [,,, id, title, status] = process.argv;
    const validStatus = ["todo", "onprogress", "done"].includes(status);
    if (!validStatus) {
      console.error(`Error: Invalid status "${status}". Must be one of "todo", "onprogress", or "done".`);
      process.exit(1);
    }
    const editList = todol.map((list) => +id === +list.id ? {
      ...list,
      title,
      status
    } : list);
    fs.writeFileSync("./todo.json", JSON.stringify(editList, null, 2));
    break;
  }
  case "delete": {
    const [,,, id] = process.argv;
    const deleteList = todol.filter((list) => +id !== +list.id);
    fs.writeFileSync("./todo.json", JSON.stringify(deleteList, null, 2));
    break;
  }
}


