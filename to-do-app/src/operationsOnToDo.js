import { data,getToDo ,deleteToDoAtAnyIndex,getIndexInLocalDatabase,alterCompletedProperty} from "/src/localDataAndElements.js";
import { updateCountsForRemovedToDo, updateAnalytics } from "/src/analytics.js";
import { createModal } from "/src/createFunctions.js";
import { checkAndRenderOneToDo, displayToDos } from "/src/renderFunction.js";
import {
  deleteToDoFromDatabase,
  updateToDoInDatabase,
  bulkUpdateInDatabase,
  bulkDeleteFromDatabase
} from "/src/server.js";
import { showSnackbar, copyContent } from "/src/otherFunctions.js";
import { addActions } from "/src/history.js";
import { getDocumentElementUsingSelector , changeBtnStyleForSelection} from "/src/index.js";



export const deleteToDo = (id) => {
  deleteToDoFromDatabase(id)
    .then(() => {
      const index = getIndexInLocalDatabase(id);
      addActions("delete", [id], [], [{ ...getToDo(index)}]);
      updateCountsForRemovedToDo(data.allTodos[index]);
      //fun
      getDocumentElementUsingSelector(`[data-id="ID${id}"]`).remove();
      deleteToDoAtAnyIndex(index);
      // data.allTodos.splice(index, 1);
      updateAnalytics();
    })
    .catch((e) => showSnackbar(e));
};



//split
export const addOrRemoveFromSeleted = (index) => {
  const indexInSelected = data.curOnScreenSelected.indexOf(index);
  const selectCircle = getDocumentElementUsingSelector(`#selectToDo${index}`);
  if (indexInSelected === -1) {
    data.curOnScreenSelected.push(index);
    //fun
    changeBtnStyleForSelection(selectCircle, true);
    // selectCircle.style.backgroundColor = "rgb(64, 64, 255)";
    // selectCircle.style.border = "1px solid white";
  } else {
    data.curOnScreenSelected.splice(indexInSelected, 1);
    // selectCircle.style.backgroundColor = "";
    changeBtnStyleForSelection(selectCircle, false);
  }
};



const updateToDo = (toDo, updatedToDo) => {
  updateToDoInDatabase(updatedToDo.ID, updatedToDo)
    .then((returnedToDo) => {
      addActions("edit", [toDo.ID], [{ ...returnedToDo }], [{ ...toDo }]);
      updateCountsForRemovedToDo(toDo);
      copyContent(toDo, returnedToDo);
      checkAndRenderOneToDo(toDo);
    })
    .catch((e) => showSnackbar(e));
}

export const alterCompletionOfToDo = (id) => {
  const index = getIndexInLocalDatabase(id);
  const updatedToDo = { ...getToDo(index) };
  updatedToDo.completed = !updatedToDo.completed;
  updateToDo(getToDo(index), updatedToDo);
};

const addListenerToModalUpdateBtn = (btnID, toDo, updateModal) => {
  const updateBtn = getDocumentElementUsingSelector(`#${btnID}`);
  updateBtn.addEventListener("click", () => {
    const updatedTitle = getDocumentElementUsingSelector("#updateToDoTitle").value;

    if (updatedTitle.trim() !== "") {
      const updatedToDo = { ...toDo };
      updatedToDo.title = updatedTitle;
      updatedToDo.urgency = getDocumentElementUsingSelector("#updatedUrgency").selectedIndex;
      updatedToDo.category = getDocumentElementUsingSelector("#updatedCategory").selectedIndex;

      updateToDo(toDo, updatedToDo);
      updateModal.remove();
    }
  });
};

const addListenerToModalCancelBtn = (btnID, updateModal) => {
  const cancelBtn = getDocumentElementUsingSelector(`#${btnID}`);
  cancelBtn.addEventListener("click", () => updateModal.remove());
};

export const editToDo = (id) => {
  const indexInToDos = getIndexInLocalDatabase(id);
  const toDo = getToDo(indexInToDos);
  const updateModal = createModal(toDo.title, toDo.urgency, toDo.category);
  updateModal.querySelector("#updatedUrgency").selectedIndex = toDo.urgency;
  updateModal.querySelector("#updatedCategory").selectedIndex = toDo.category;
  document.body.appendChild(updateModal);

  addListenerToModalUpdateBtn("updateToDoBtn", toDo, updateModal);
  addListenerToModalCancelBtn("cancelUpdateBtn", updateModal);
};

export const clearSelection = () => {
  data.curOnScreenSelected.forEach((index) => {
    const selectCircle = getDocumentElementUsingSelector(`#selectToDo${index}`);
    changeBtnStyleForSelection(selectCircle,false);
  });
  data.curOnScreenSelected.length = 0;
};

const filterCurSelectedToDoArray = (ids) => {
  const newIds = [];
  ids.forEach((id) => {
    if (!getToDo(getIndexInLocalDatabase(id)).completed) {
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
    toDosforUpdation.push({ ...getToDo(index) });
    indexsForUpdation.push(index);
    toDosforUpdation[toDosforUpdation.length - 1].completed = true;
  });
  bulkUpdateInDatabase(data.curOnScreenSelected, toDosforUpdation)
    .then(() => {
      indexsForUpdation.forEach((index) => alterCompletedProperty(index));
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
        deleteToDoAtAnyIndex(getIndexInLocalDatabase(id));
        // data.allTodos.splice(getIndexInLocalDatabase(id), 1);
      });
      data.curOnScreenSelected.length = 0;
      displayToDos();
    })
    .catch((e) => showSnackbar(e));
};
