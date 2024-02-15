import '../styles/main.scss';
import { popup } from './components/popup.mjs';
import { createCard } from './components/card.mjs';
import { filterTasks } from './components/filter.mjs';

let tasks = localStorage.getItem('tasks');
const hasTasksInStorage = !!tasks;

const createTaskBtn = document.querySelector('.management__create-btn');
const todoList = document.querySelector('.todo__list');
const filterSelect = document.getElementById('filter-select');

createTaskBtn.addEventListener('click', handlerClickBtnCreate);
filterSelect.addEventListener('change', handlerChangeSelect)

function handlerClickBtnCreate() {
  const body = document.body;
  body.append(popup);
};

function handlerChangeSelect(event) {
  console.log(event.value)
  filterTasks(filterSelect.value);
};

if (hasTasksInStorage) {
  tasks = JSON.parse(tasks);

  tasks.forEach((todoData) => {
    const { title, description, date, status } = todoData;
    const card = createCard(title, description, date, status);
    todoList.append(card);
  });
}
