import { createCustomElem } from "../../utils/helperFunctions.mjs";
import { createCard } from "./card.mjs";

const popup = createCustomElem('div', ['popup']);
popup.addEventListener('click', handlerClickPopup);
const createForm = createCustomElem('form', ['create-form']);
createForm.addEventListener('submit', handlerSubmitCreateForm);

const labelTitle = createCustomElem('label', ['create-form__label'], 'Title');
const labelDescription = createCustomElem('label', ['create-form__label'], 'Description');

const inputTitle = createCustomElem('input', ['crete-form__input']);
const InputDescription = createCustomElem('textarea', ['crete-form__input']);

const addBtn = createCustomElem('button', ['create-form__add-btn'], 'Add task');

labelTitle.append(inputTitle);
labelDescription.append(InputDescription);
createForm.append(labelTitle, labelDescription, addBtn);
popup.append(createForm);

function handlerClickPopup(event) {
  if (event.target === popup) {
    popup.remove();
  }
}

function handlerSubmitCreateForm(event) {
  event.preventDefault();
  const todoList = document.querySelector('.todo__list');

  const title = inputTitle.value;
  const description = InputDescription.value

  const newCard = createCard(title, description);
  todoList.append(newCard);
  inputTitle.value = '';
  InputDescription.value = '';
  popup.remove();
}

export { popup }