import { addTaskInStorage, createCustomElem, deleteTaskFromStorage, updateTaskInStorage } from "../../utils/helperFunctions.mjs";

function createCard(title, description, date = '', status = true) {
  const statusCard = status ? 'active': 'completed';
  const dateCreate = date.length ? date : new Date().toLocaleString();

  if (!date.length) {
    addTaskInStorage(title, description, dateCreate, status);
  }
  const todoCard = createCustomElem('li', ['card', statusCard]);
  const headingElem = createCustomElem('h2', ['card__heading'], title);
  const descriptionElem = createCustomElem('p', ['card__description'], description);
  const dateElem = createCustomElem('span', ['card__create-date'], dateCreate);
  const btnsConteiner = createBtnsConteiner(todoCard, title, status);
  
  todoCard.append(
    dateElem,
    headingElem,
    descriptionElem,
    btnsConteiner
  );

  return todoCard;
};

function createBtnsConteiner(parentElem, title, status) {
  const btnsConteiner = createCustomElem('div', ['card__btns-container']);
  const completeBtn = createCustomElem('button', ['card__btn-complete'], `${status ? 'completed' : 'active'}`);
  completeBtn.addEventListener('click', () => handlerClickCompleteBtn(parentElem, title));

  const deleteBtn = createCustomElem('button', ['card__btn-delete'], 'delete');
  deleteBtn.addEventListener('click', () => {
    deleteTaskFromStorage(title);
    parentElem.remove();
  })

  btnsConteiner.append(completeBtn, deleteBtn);
  return btnsConteiner;
};

function handlerClickCompleteBtn(parentElem, title) {
  updateTaskInStorage(title);
  parentElem.classList.toggle('active');
  parentElem.classList.toggle('completed');
  location.reload();
}

export { createCard }