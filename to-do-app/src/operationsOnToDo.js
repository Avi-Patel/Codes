import { data } from "/src/dataAndElements.js";
import { updateCountsForRemovedToDo, updateAnalytics } from "/src/analytics.js";
import { createModal } from "/src/createFunctions.js";
import { checkAndRenderOneToDo } from "/src/renderFunction.js";

export const deleteToDo = (index) => {
  let indexInToDos = null;
  data.allTodos.forEach((todo, i) => {
    if (todo.ID === index) {
      indexInToDos = i;
    }
  });
  updateCountsForRemovedToDo(data.allTodos[indexInToDos]);
  document.querySelector(`#ID${index}`).remove();
  data.allTodos.splice(indexInToDos, 1);
  updateAnalytics();
};

export const addOrRemoveFromSeleted = (index) => {
  const indexInSelected = data.curOnScreenSelected.indexOf(index);
  const selectCircle = document.querySelector(`#selectToDo${index}`);
  if (indexInSelected === -1) {
    data.curOnScreenSelected.push(index);
    selectCircle.style.backgroundColor = "rgb(64, 64, 255)";
    selectCircle.style.border = "1px solid white";
  } else {
    data.curOnScreenSelected.splice(indexInSelected, 1);
    selectCircle.style.backgroundColor = "";
  }
};

export const alterCompletionOfToDO = (index) => {
  let toDo = null;
  data.allTodos.forEach((toDoX) => {
    if (toDoX.ID === index) {
      toDo = toDoX;
    }
  });
  updateCountsForRemovedToDo(toDo);
  toDo.completed = toDo.completed ? false : true;
  checkAndRenderOneToDo(toDo);
};

export const editToDo = (id) => {
  let indexInToDos = null;
  data.allTodos.forEach((todo, i) => {
    if (todo.ID === id) {
      indexInToDos = i;
    }
  });
  const toDo = data.allTodos[indexInToDos];
  const updateModal = createModal(toDo.title, toDo.urgency, toDo.category);
  updateModal.querySelector("#updatedUrgency").selectedIndex = toDo.urgency;
  updateModal.querySelector("#updatedCategory").selectedIndex = toDo.category;
  document.body.appendChild(updateModal);
  const updateBtn = document.querySelector("#updateToDoBtn");
  const cancelBtn = document.querySelector("#cancelUpdateBtn");

  updateBtn.addEventListener("click", () => {
    const updatedTitle = document.querySelector("#updateToDoTitle").value;
    if (updatedTitle.trim() !== "") {
      const updatedUrgency = document.querySelector("#updatedUrgency")
        .selectedIndex;
      const updatedCategory = document.querySelector("#updatedCategory")
        .selectedIndex;
      toDo.title = updatedTitle;
      toDo.urgency = updatedUrgency;
      toDo.category = updatedCategory;
    }
    updateCountsForRemovedToDo(toDo);
    checkAndRenderOneToDo(toDo);
    updateModal.remove();
  });
  cancelBtn.addEventListener("click", () => {
    updateModal.remove();
  });
};

export const removeAllFromSeleted = () => {
  data.curOnScreenSelected.forEach((index) => {
    const selectCircle = document.querySelector(`#selectToDo${index}`);
    selectCircle.style.backgroundColor = "";
  });
};

export const updateAllToCompleted = () => {
  data.allTodos.forEach((toDo) => {
    if (data.curOnScreenSelected.indexOf(toDo.ID) !== -1) {
      toDo.completed = true;
    }
  });
};
