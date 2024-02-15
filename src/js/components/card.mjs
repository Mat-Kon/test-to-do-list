import { addTaskInStorage, createCustomElem, deleteTaskFromStorage, updateTaskInStorage } from "../../utils/helperFunctions.mjs";

function createCard(title, description, date = '', status = true) {
  //create variable values depending on the received parameters
  const statusCard = status ? 'active': 'completed';
  const dateCreate = date.length ? date : new Date().toLocaleString();

  //check date if date not have length, we add task in localStorage
  if (!date.length) {
    addTaskInStorage(title, description, dateCreate, status);
  }

  //create elements
  const todoCard = createCustomElem('li', ['card', statusCard]);
  const headingElem = createCustomElem('h2', ['card__heading'], title);
  const descriptionElem = createCustomElem('p', ['card__description'], description);
  const dateElem = createCustomElem('span', ['card__create-date'], dateCreate);
  const btnsConteiner = createBtnsConteiner(todoCard, title, status);
  
  //append elements in card
  todoCard.append(
    dateElem,
    headingElem,
    descriptionElem,
    btnsConteiner
  );

  return todoCard;
};

//create container for buttons
function createBtnsConteiner(parentElem, title, status) {
  //create elements
  const btnsConteiner = createCustomElem('div', ['card__btns-container']);
  const completeBtn = createCustomElem('button', ['card__btn-complete'], `${status ? 'completed' : 'active'}`);
  //add listener for complete button
  completeBtn.addEventListener('click', () => handlerClickCompleteBtn(parentElem, title));
  const deleteBtn = createCustomElem('button', ['card__btn-delete'], 'delete');
  //add listener for delete button
  deleteBtn.addEventListener('click', () => {
    deleteTaskFromStorage(title);
    parentElem.remove();
  })
  //append buttons in container
  btnsConteiner.append(completeBtn, deleteBtn);
  //return container
  return btnsConteiner;
};

//create handler for complete button
function handlerClickCompleteBtn(parentElem, title) {
  updateTaskInStorage(title);
  parentElem.classList.toggle('active');
  parentElem.classList.toggle('completed');
  location.reload();
}

export { createCard }