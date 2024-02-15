// import { readFile, writeFile } from 'fs';

const createCustomElem = (
  tag,
  classNames,
  content = '') => {
    const element = document.createElement(tag);
    const className = classNames.join(' ');
    element.className = className;
    element.textContent = content;

    return element;
};

async function addTaskInStorage(title, description, date, status) {
  const task = { title, description, date, status };
  let tasks = localStorage.getItem('tasks');
  if (!tasks) {
    tasks = [];
  } else {
    tasks = JSON.parse(tasks);
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskInStorage(title) {
  let tasks = localStorage.getItem('tasks');
  const hasTasksInStorage = !!tasks;
  if (hasTasksInStorage) {
    tasks = JSON.parse(tasks);
    const updateTasks = tasks.map((task) => {
      if (task.title === title) {
        const prevStatus = task.status;
        task.status = !prevStatus;
        return task;
      }
      return task;
    });
    localStorage.setItem('tasks', JSON.stringify(updateTasks));
  }
  return;
}

export { createCustomElem, addTaskInStorage, updateTaskInStorage }