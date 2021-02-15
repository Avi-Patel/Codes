import { checkAndRenderOneToDo, displayToDos } from "/src/renderFunction.js";
import { updateToDoInDatabase, deleteToDoFromDatabase, createToDoInDatabase, bulkUpdateInDatabase } from "/src/server.js";
import { updateCountsForRemovedToDo } from "/src/analytics.js";
import { showSnackbar, copyContent } from "/src/otherFunctions.js";
import { getDocumentElementUsingSelector } from "/src/index.js";
import { data, pushNewToDo, deleteToDoAtAnyIndex, insertToDoAtAnyIndex, alterCompletedProperty, getIndexInLocalDatabase } from "/src/localDataAndElements.js";

const history = {
  position: -1,
  actions: [],
}

const createToDoUndoRedo = (id, toDo, isUndo) => {
  if (isUndo) {
    deleteToDoFromDatabase(id).then(() => {
      data.allTodos.splice(getIndexInLocalDatabase(id), 1);
      updateCountsForRemovedToDo(toDo);
      getDocumentElementUsingSelector(`[data-id="ID${id}"]`).remove(); // create functions
      history.position--;
    })
      .catch((e) => showSnackbar(e));
  }
  else {
    createToDoInDatabase(toDo).then(() => {
      pushNewToDo({ ...toDo });
      checkAndRenderOneToDo(data.allTodos[data.allTodos.length - 1]);
      history.position++;
    })
      .catch((e) => showSnackbar(e));
  }
}

const findIndexToInsert = (id) => {
  let index = data.allTodos.length;
  data.allTodos.forEach((toDo, i) => {
    if (toDo.ID > id && i > 0 && data.allTodos[i - 1].ID < id) {
      index = i;
    }
  });
  if (data.allTodos.length === 0 || id < data.allTodos[0].ID) {
    index = 0;
  }
  return index;
}

const deleteToDoUndoRedo = (id, toDo, isUndo) => {
  if (isUndo) {
    createToDoInDatabase(toDo)
      .then(() => {
        const index = findIndexToInsert(id);
        insertToDoAtAnyIndex(index, toDo);
        // data.allTodos.splice(index, 0, toDo);
        history.position--;
        displayToDos();
      })
      .catch((e) => showSnackbar(e));
  }
  else {
    deleteToDoFromDatabase(id)
      .then(() => {
        deleteToDoAtAnyIndex(getIndexInLocalDatabase(id));
        // data.allTodos.splice(getIndexInLocalDatabase(id), 1);
        history.position++;
        displayToDos();
      })
      .catch((e) => showSnackbar(e));
  }

};

const editToDoUndoRedo = (id, toDo, oldToDo, isUndo) => {
  let toDoCopy = {};
  if (isUndo) {
    toDoCopy = { ...oldToDo };
  }
  else {
    toDoCopy = { ...toDo };
  }
  console.log(id, toDoCopy);
  updateToDoInDatabase(id, toDoCopy)
    .then((returnedToDo) => {
      copyContent(data.allTodos[getIndexInLocalDatabase(id)], returnedToDo);
      if (isUndo) {
        history.position--;
        updateCountsForRemovedToDo(toDo);
      }
      else {
        history.position++;
        updateCountsForRemovedToDo(oldToDo);
      }
      checkAndRenderOneToDo(returnedToDo);
    })
    .catch((e) => showSnackbar(e));
}

const deleteInBulk = () => { };

const alterCompletionInBulkUndoRedo = (ids, isUndo) => {
  const indexs = [];
  const toDos = []
  ids.forEach((id, i) => {
    const index = getIndexInLocalDatabase(id);
    indexs.push(index);
    toDos.push({ ...data.allTodos[index] });
    toDos[i].completed = !toDos[i].completed;
  })
  bulkUpdateInDatabase(ids, toDos).then(() => {
    indexs.forEach((index) => alterCompletedProperty(index));
    displayToDos();
    if (isUndo) {
      history.position--;
    }
    else {
      history.position++;
    }
  })
    .catch((e) => showSnackbar(e));
};

export const undo = () => {
  if (history.position === -1) return;
  console.log(history.position);

  // make consts
  switch (history["actions"][history.position].command) {
    case "edit":
      console.log("Edit");
      editToDoUndoRedo(history["actions"][history.position]["IDs"][0], history["actions"][history.position]["toDos"][0], history["actions"][history.position]["oldToDos"][0], true);
      break;
    case "alterCompletionInBulk":
      alterCompletionInBulkUndoRedo(history["actions"][history.position]["IDs"], true);
      break;
    case "create":
      createToDoUndoRedo(history["actions"][history.position]["IDs"][0], history["actions"][history.position]["toDos"][0], true);
      break
    case "delete":
      console.log("delete");
      deleteToDoUndoRedo(history["actions"][history.position]["IDs"][0], history["actions"][history.position]["oldToDos"][0], true);
      break;
    default:
      break;
  }

};
export const redo = () => {
  if (history.position === history.actions.length - 1) return;
  console.log(history.position);
  switch (history["actions"][history.position + 1].command) {
    case "edit":
      editToDoUndoRedo(history["actions"][history.position + 1]["IDs"][0], history["actions"][history.position + 1]["toDos"][0], history["actions"][history.position + 1]["oldToDos"][0], false);
      break;
    case "alterCompletionInBulk":
      alterCompletionInBulkUndoRedo(history["actions"][history.position + 1]["IDs"], false);
      break;
    case "create":
      createToDoUndoRedo(history["actions"][history.position + 1]["IDs"][0], history["actions"][history.position + 1]["toDos"][0], false);
      break;
    case "delete":
      deleteToDoUndoRedo(history["actions"][history.position + 1]["IDs"][0], history["actions"][history.position + 1]["oldToDos"][0], false);
      break;
    default:
      break;
  }
};

export const addActions = (commandType, toDoIDs, toDos, oldToDos) => {
  history.actions = history.actions.slice(0, history.position + 1);
  const newAction = {
    "command": commandType,
    "IDs": toDoIDs,
  }
  if (toDos) {  //!toDos
    newAction["toDos"] = toDos;
  }
  if (oldToDos) {
    newAction["oldToDos"] = oldToDos;
  }
  history.actions.push(newAction);
  history.position++;
  // console.log(history.position, history.actions[history.position]);
};