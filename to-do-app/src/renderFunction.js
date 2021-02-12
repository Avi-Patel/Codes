import { data, queriedElements } from "/src/dataAndElements.js";
import { checkWithFilter, containSearchedWord } from "/src/filter.js";
import {
  alterCompletionOfToDO,
  addOrRemoveFromSeleted,
  deleteToDo,
  editToDo
} from "/src/operationsOnToDo.js";
import { updateAnalytics } from "/src/analytics.js";
import { createToDoNode } from "/src/createFunctions.js";

const addListenerForToDo = (id) => {
  const toDoitem = document.querySelector(`#ID${id}`);
  toDoitem.addEventListener("click", (event) => {
    const targetID = event.target.id;
    if (targetID === "markCompleted" + id) {
      alterCompletionOfToDO(id);
    } else if (targetID === "selectToDo" + id) {
      addOrRemoveFromSeleted(id);
    } else if (targetID === "deleteToDo" + id) {
      deleteToDo(id);
      data.curOnScreenSelected.length = 0;
    } else if (targetID === "editToDo" + id) {
      editToDo(id);
      data.curOnScreenSelected.length = 0;
    }
  });
};

export const checkAndRenderOneToDo = (toDoItem) => {
  const oldToDo = document.querySelector(`#ID${toDoItem.ID}`);
  const conditionSatisfied =
    checkWithFilter(toDoItem) &&
    containSearchedWord(queriedElements.searchInput.value, toDoItem.title);
  if (conditionSatisfied) {
    data.totalCount++;
    if (toDoItem.completed) data.countCompleted++;
    if (oldToDo !== undefined && oldToDo !== null) {
      queriedElements.todosBox.replaceChild(createToDoNode(toDoItem), oldToDo);
    } else {
      queriedElements.todosBox.appendChild(createToDoNode(toDoItem));
    }
    addListenerForToDo(toDoItem.ID);
  } else if (oldToDo !== null || oldToDo !== undefined) {
    oldToDo.remove();
  }
  updateAnalytics();
};

export const displayToDos = () => {
  let countCompleted = 0,
    totalCount = 0;
  queriedElements.todosBox
    .querySelectorAll("*")
    .forEach((node) => node.remove());

  data.allTodos.forEach((toDoItem) => {
    const conditionSatisfied =
      checkWithFilter(toDoItem) &&
      containSearchedWord(queriedElements.searchInput.value, toDoItem.title);
    if (conditionSatisfied) {
      totalCount++;
      if (toDoItem.completed) {
        countCompleted++;
      }
      queriedElements.todosBox.appendChild(createToDoNode(toDoItem));
      addListenerForToDo(toDoItem.ID);
    }
  });
  data.curOnScreenSelected.length = 0;
  data.countCompleted = countCompleted;
  data.totalCount = totalCount;
  updateAnalytics();
};
