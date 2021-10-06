const columns = document.querySelectorAll('div[class |= "column" ]');

export class TaskList {
    constructor(userText) {
        this.userText = userText;
    }

    addNewToDoTask () {
        const newTask = document.createElement('div');
        newTask.className = 'task';
        newTask.draggable = 'true';
      
        newTask.innerHTML = `
        <div class="task-details" > 
        <span class="task-title">
        ${this.userText}
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
            if (afterElement == undefined) {
            column.appendChild(draggable);
            } else {
              column.insertBefore(draggable, afterElement);
             }
        })
        }) 
      };     
}

function getDragAfterElement(column, y) 
{
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
