import '../styles/main.scss';
import { popup } from './components/popup.mjs';
import { createCard } from './components/card.mjs';
import { filterCards } from './components/filter.mjs';

//get elements
let tasks = localStorage.getItem('tasks');
const hasTasksInStorage = !!tasks;

const createTaskBtn = document.querySelector('.management__create-btn');
const todoList = document.querySelector('.todo__list');
const filterSelect = document.getElementById('filter-select');

//add listeners
createTaskBtn.addEventListener('click', handlerClickBtnCreate);
filterSelect.addEventListener('change', () => handlerChangeSelect());

//create handlers
function handlerClickBtnCreate() {
  const body = document.body;
  body.classList.add('popup-open');
  body.append(popup);
};

function handlerChangeSelect() {
  filterCards(filterSelect.value);
};

//check localStorage and create cards if we have tasks
if (hasTasksInStorage) {
  tasks = JSON.parse(tasks);
  const sortedTasks = tasks.sort((a, b) => {
    if(a.status) {
      return -1;
    }
    return 1;
  });

  tasks.forEach((todoData) => {
    const { title, description, date, status } = todoData;
    const card = createCard(title, description, date, status);
    todoList.append(card);
  });
}
