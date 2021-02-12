import { data } from "/src/dataAndElements.js";
import { updateCountsForRemovedToDo, updateAnalytics } from "/src/analytics.js";
import { createModal } from "/src/createFunctions.js";
import { checkAndRenderOneToDo } from "/src/renderFunction.js";

const getIndexInDatabase = (id) => {
  let index = null;
  data.allTodos.forEach((toDo, i) => {
    if (toDo.ID === id) index = i;
  });
  return index;
};

const getToDofromDatabase = (id) => {
  let toDO = null;
  data.allTodos.forEach((toDoX, i) => {
    if (toDoX.ID === id) toDO = toDoX;
  });
  return toDO;
};

export const deleteToDo = (id) => {
  let indexInToDos = getIndexInDatabase(id);
  updateCountsForRemovedToDo(data.allTodos[indexInToDos]);
  document.querySelector(`#ID${id}`).remove();
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

export const alterCompletionOfToDO = (id) => {
  let toDo = getToDofromDatabase(id);
  updateCountsForRemovedToDo(toDo);
  toDo.completed = toDo.completed ? false : true;
  checkAndRenderOneToDo(toDo);
};

const addListenerToModalUpdateBtn = (btnID, toDo, updateModal) => {
  const updateBtn = document.querySelector(`#${btnID}`);
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
};

const addListenerToModalCancelBtn = (btnID, updateModal) => {
  const cancelBtn = document.querySelector(`#${btnID}`);
  cancelBtn.addEventListener("click", () => {
    updateModal.remove();
  });
};

export const editToDo = (id) => {
  let indexInToDos = getIndexInDatabase(id);
  const toDo = data.allTodos[indexInToDos];
  const updateModal = createModal(toDo.title, toDo.urgency, toDo.category);
  updateModal.querySelector("#updatedUrgency").selectedIndex = toDo.urgency;
  updateModal.querySelector("#updatedCategory").selectedIndex = toDo.category;
  document.body.appendChild(updateModal);

  addListenerToModalUpdateBtn("updateToDoBtn", toDo, updateModal);
  addListenerToModalCancelBtn("cancelUpdateBtn", updateModal);
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
