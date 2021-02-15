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
import { showSnackbar, getIndexInLocalDatabase, copyContent } from "/src/otherFunctions.js";
import { addActions } from "/src/history.js";



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



const updateToDo = (toDo, updatedToDo) => {
  updateToDoInDatabase(updatedToDo.ID, updatedToDo)
    .then((returnedToDo) => {
      addActions("edit", [toDo.ID], [{ ...returnedToDo }], [{ ...toDo }]);
      updateCountsForRemovedToDo(toDo);
      copyContent(toDo, returnedToDo);
      console.log(toDo);
      checkAndRenderOneToDo(toDo);
    })
    .catch((e) => {
      showSnackbar(e);
    });
}

export const alterCompletionOfToDo = (id) => {
  const index = getIndexInLocalDatabase(id);
  const updatedToDo = { ...data.allTodos[index] };
  console.log(updatedToDo);
  updatedToDo.completed = updatedToDo.completed ? false : true;
  updateToDo(data.allTodos[index], updatedToDo);
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

      updateToDo(toDo, updatedToDo);
      updateModal.remove();
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

const filterCurSelectedToDoArray = (ids) => {
  const newIds = [];
  ids.forEach((id) => {
    if (!data.allTodos[getIndexInLocalDatabase(id)].completed) {
      newIds.push(id);
    }
  })
  return newIds;
}

export const updateAllToCompleted = () => {
  const toDosforUpdation = [];
  const indexsForUpdation = [];
  data.curOnScreenSelected = filterCurSelectedToDoArray(data.curOnScreenSelected);
  data.curOnScreenSelected.forEach((id, i) => {
    const index = getIndexInLocalDatabase(id);
    toDosforUpdation.push({ ...data.allTodos[index] });
    indexsForUpdation.push(index);
    toDosforUpdation[toDosforUpdation.length - 1].completed = true;
  });
  bulkUpdateInDatabase(indexsForUpdation, toDosforUpdation)
    .then(() => {
      indexsForUpdation.forEach((index) => data.allTodos[index].completed = true);
      addActions("alterCompletionInBulk", [...data.curOnScreenSelected]);
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
