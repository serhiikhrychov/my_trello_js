import {TaskList} from './myscript2.js'

const cardContainer = document.getElementById('cardContainer');
const addCardLink = document.getElementById('add-card');
const addIcon = document.getElementById('addIcon');
const newCard = document.getElementById('newCardId');
const saveButton = document.getElementById('saveBtn');


addCardLink.addEventListener('click', () => {
  const toDoListElement = document.getElementById('cardContainer');
  const newCardElement = document.createElement('div');
  let newCardLink = document.getElementById('newCardId');

  newCardElement.className = 'list-card-details';
  const newTextArea = document.createElement('textarea');

  newTextArea.className = 'text-area';
  newTextArea.id = 'text-area-id';
  newTextArea.placeholder = 'Enter a title for this card';

  newCardElement.appendChild(newTextArea);
  toDoListElement.prepend(newCardElement);

  showOrHideAddCardButton();
  addSaveButton();
});

function showOrHideAddCardButton() {
  if (newCard.style.visibility === 'hidden') {
    newCard.style.visibility = 'visible';
  } else {
    newCard.style.visibility = 'hidden';
  }
}

function addSaveButton() {
  let addButtonDiv = document.createElement('a');
  addButtonDiv.className = 'saveBtn';
  addButtonDiv.href = '#';
  let addButtonSpan = document.createElement('span');
  addButtonSpan.innerText = 'Save Button';
  addButtonSpan.id = 'saveBtn';
  addButtonDiv.appendChild(addButtonSpan);
  cardContainer.appendChild(addButtonDiv);
}


const addUserTask = () => {
      const toDoTextArea = document.getElementById('text-area-id');
      const userText = toDoTextArea.value;
      const newTask = new TaskList(userText);
      newTask.addNewToDoTask();
    };

cardContainer.addEventListener('click', (e) => {
  if (e.target.id == 'saveBtn') {
    addUserTask();
  }
});
