const columns = document.querySelectorAll('div[class |= "column" ]');
const cardContainer = document.getElementById('cardContainer');
const addCardLink = document.getElementById('add-card');
const addIcon = document.getElementById('addIcon');
const newCard = document.getElementById('newCardId');
//const toDoTextArea = document.getElementById('text-area-id');
const saveButton = document.getElementById('saveBtn');

//console.log(columns);
//console.log(toDoTextArea);

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

const addNewToDoTask = (userText) => {
  const newTask = document.createElement('div');
  newTask.className = 'task';
  newTask.draggable = 'true';

  newTask.innerHTML = `
  <div class="task-details" > 
  <span class="task-title">
  ${userText}
  </span>
  <button id="del">X</button>
  </div>
  `;

  const taskList = document.getElementById('list-of-tasks');
  taskList.append(newTask);
  const deleteButton = newTask.querySelector('#del');
  deleteButton.addEventListener('click', () => {
    newTask.remove();
  });

  newTask.addEventListener('dragstart', () => {
   // console.log('dragging');
    newTask.classList.add('dragging');
  })

  newTask.addEventListener('dragend', () => {
    newTask.classList.remove('dragging');
  })

  columns.forEach(column => {
    column.addEventListener('dragover', e => {
      e.preventDefault();
      const afterElement = getDragAfterElement(column, e.clientY);
     // console.log(afterElement);
      const draggable = document.querySelector('.dragging');
      console.log(draggable);
      if (afterElement == undefined) {
      column.appendChild(draggable);
      } else {
        column.insertBefore(draggable, afterElement);
       }
  })
  })
  



};


function getDragAfterElement(column, y) {
  // const shit = column.querySelectorAll('div[draggable]:not(.dragging)');              
  // console.log(shit);
const draggableElements = [...column.querySelectorAll('div[draggable]:not(.dragging)')];
return draggableElements.reduce((closest, child) => {
 const box = child.getBoundingClientRect();
 const offset = y-box.top - box.height / 2;
 if (offset < 0 && offset > closest.offset) {
   return {offset: offset, element: child};
 } else {
   return closest;
 }
}, {offset: Number.NEGATIVE_INFINITY}).element
};



const addUserTask = () => {
  const toDoTextArea = document.getElementById('text-area-id');
  const userText = toDoTextArea.value;
  addNewToDoTask(userText);
};

cardContainer.addEventListener('click', (e) => {
  if (e.target.id == 'saveBtn') {
    addUserTask();
  }
});
