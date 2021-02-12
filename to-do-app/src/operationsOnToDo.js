import { data } from "/src/localDataAndElements.js";
import { updateCountsForRemovedToDo, updateAnalytics } from "/src/analytics.js";
import { createModal } from "/src/createFunctions.js";
import { checkAndRenderOneToDo, displayToDos } from "/src/renderFunction.js";
import {
  deleteToDoFromDatabase,
  updateToDoInDatabase,
  bulkUpdateInDatabase,
  bulkDeleteFromDatabase
} from "/src/server.js";
import { showSnackbar } from "/src/otherFunctions.js";

const getIndexInLocalDatabase = (id) => {
  let index = null;
  data.allTodos.forEach((toDo, i) => {
    if (toDo.ID === id) index = i;
  });
  return index;
};

export const deleteToDo = (id) => {
  deleteToDoFromDatabase(id)
    .then((returnedIndex) => {
      updateCountsForRemovedToDo(data.allTodos[returnedIndex]);
      document.querySelector(`[data-id="ID${id}"]`).remove();
      data.allTodos.splice(returnedIndex, 1);
      updateAnalytics();
    })
    .catch((e) => showSnackbar(e));
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

export const alterCompletionOfToDo = (id) => {
  const index = getIndexInLocalDatabase(id);
  const updatedToDo = { ...data.allTodos[index] };
  updatedToDo.completed = updatedToDo.completed ? false : true;
  updateToDoInDatabase(id, updatedToDo)
    .then((returnedToDo) => {
      updateCountsForRemovedToDo(data.allTodos[index]);
      data.allTodos[index] = returnedToDo;
      checkAndRenderOneToDo(returnedToDo);
    })
    .catch((e) => showSnackbar(e));
};

const addListenerToModalUpdateBtn = (btnID, toDo, updateModal) => {
  const updateBtn = document.querySelector(`#${btnID}`);
  updateBtn.addEventListener("click", () => {
    const updatedTitle = document.querySelector("#updateToDoTitle").value;

    if (updatedTitle.trim() !== "") {
      const updatedToDo = { ...toDo };
      updatedToDo.title = updatedTitle;
      updatedToDo.urgency = document.querySelector(
        "#updatedUrgency"
      ).selectedIndex;
      updatedToDo.category = document.querySelector(
        "#updatedCategory"
      ).selectedIndex;

      updateToDoInDatabase(updatedToDo.ID, updatedToDo).then((returnedToDo) => {
        toDo.title = returnedToDo.title;
        toDo.urgency = returnedToDo.urgency;
        toDo.category = returnedToDo.category;
        // toDo = returnedToDo;
        updateCountsForRemovedToDo(returnedToDo);
        checkAndRenderOneToDo(toDo);
        updateModal.remove();
      });
    }
  });
};

const addListenerToModalCancelBtn = (btnID, updateModal) => {
  const cancelBtn = document.querySelector(`#${btnID}`);
  cancelBtn.addEventListener("click", () => updateModal.remove());
};

export const editToDo = (id) => {
  let indexInToDos = getIndexInLocalDatabase(id);
  const toDo = data.allTodos[indexInToDos];
  const updateModal = createModal(toDo.title, toDo.urgency, toDo.category);
  updateModal.querySelector("#updatedUrgency").selectedIndex = toDo.urgency;
  updateModal.querySelector("#updatedCategory").selectedIndex = toDo.category;
  document.body.appendChild(updateModal);

  addListenerToModalUpdateBtn("updateToDoBtn", toDo, updateModal);
  addListenerToModalCancelBtn("cancelUpdateBtn", updateModal);
};

export const clearSelection = () => {
  data.curOnScreenSelected.forEach((index) => {
    const selectCircle = document.querySelector(`#selectToDo${index}`);
    selectCircle.style.backgroundColor = "";
  });
  data.curOnScreenSelected.length = 0;
};

export const updateAllToCompleted = () => {
  const toDosforUpdation = [];
  const idsForUpdation = [];

  data.curOnScreenSelected.forEach((id, i) => {
    const index = getIndexInLocalDatabase(id);
    toDosforUpdation.push({ ...data.allTodos[index] });
    idsForUpdation.push(index);
    toDosforUpdation[i].completed = true;
  });

  bulkUpdateInDatabase(idsForUpdation, toDosforUpdation)
    .then(() => {
      idsForUpdation.forEach((index) => {
        data.allTodos[index].completed = true;
      });
      data.curOnScreenSelected.length = 0;
      displayToDos();
    })
    .catch((e) => showSnackbar(e));
};

export const deleteAllSelectedToDos = () => {
  const idsToBeDeleted = [...data.curOnScreenSelected];
  bulkDeleteFromDatabase(idsToBeDeleted)
    .then(() => {
      idsToBeDeleted.forEach((id) => {
        const index = getIndexInLocalDatabase(id);
        data.allTodos.splice(index, 1);
      });
      data.curOnScreenSelected.length = 0;
      displayToDos();
    })
    .catch((e) => showSnackbar(e));
};
