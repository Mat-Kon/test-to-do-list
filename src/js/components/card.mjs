import { addTaskInStorage, createCustomElem, updateTaskInStorage } from "../../utils/helperFunctions.mjs";

function createCard(title, description, date = '', status = null) {
  const statusCard = status ? 'active': 'completed';
  const dateCreate = date.length ? new Date(date).toLocaleString(): new Date().toLocaleString();

  if (!date.length) {
    addTaskInStorage(title, description, dateCreate, status);
  }
  console.log(status);
  const todoCard = createCustomElem('li', ['card', statusCard]);
  const headingElem = createCustomElem('h4', ['card__heading'], title);
  const descriptionElem = createCustomElem('p', ['card__description'], description);
  const dateElem = createCustomElem('span', ['card__create-date'], dateCreate);
  const btnsConteiner = createBtnsConteiner(todoCard, title);
  
  todoCard.append(
    dateElem,
    headingElem,
    descriptionElem,
    btnsConteiner
  );

  return todoCard;
};

function createBtnsConteiner(parentElem, title) {

  const btnsConteiner = createCustomElem('div', ['card__btns-container']);
  const completeBtn = createCustomElem('button', ['card__btn-complete'], 'complete');
  completeBtn.addEventListener('click', () => handlerClickCompleteBtn(parentElem, title));

  const deleteBtn = createCustomElem('button', ['card__btn-delete'], 'delete');
  deleteBtn.addEventListener('click', () => {
    parentElem.remove();
  })

  btnsConteiner.append(completeBtn, deleteBtn);
  return btnsConteiner;
};

function handlerClickCompleteBtn(parentElem, title) {
  updateTaskInStorage(title)
  parentElem.classList.toggle('active');
  parentElem.classList.toggle('completed');
}

export { createCard }