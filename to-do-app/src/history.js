import { checkAndRenderOneToDo } from "/src/renderFunction.js";
import { updateToDoInDatabase } from "/src/server.js";
import { data } from "/src/localDataAndElements.js";
import { updateCountsForRemovedToDo } from "/src/analytics.js";
import { showSnackbar, getIndexInLocalDatabase } from "/src/otherFunctions.js";

const history = {
  position: -1,
  actions: [],
  commands: {
    "edit": "",
    "alterCompletion": "",
    "delete": "",
    "create": "",
    "alterCompletionInBulk": "",
    "deleteInBuk": ""
  },
}


const editToDo = (id, toDo, isUndo) => {
  const toDoCopy = { ...toDo }
  updateToDoInDatabase(id, toDoCopy)
    .then((returnedToDo) => {
      data.allTodos[getIndexInLocalDatabase(id)] = returnedToDo;
      updateCountsForRemovedToDo(returnedToDo);
      checkAndRenderOneToDo(returnedToDo);
      if (isUndo) {
        history.position--;
      }
      else {
        history.position++;
      }
    })
    .catch((e) => showSnackbar(e));
}

const deletedToDo = () => { };

const alterCompletionOfToDoForUndoRedo = (id, isUndo) => {
  const index = getIndexInLocalDatabase(id);
  const updatedToDo = { ...data.allTodos[index] };
  updatedToDo.completed = updatedToDo.completed ? false : true;
  updateToDoInDatabase(id, updatedToDo)
    .then((returnedToDo) => {
      updateCountsForRemovedToDo(data.allTodos[index]);
      data.allTodos[index] = returnedToDo;
      checkAndRenderOneToDo(returnedToDo);
      if (isUndo) {
        history.position--;
      }
      else {
        history.position++;
      }
    })
    .catch((e) => showSnackbar(e));
}

export const undo = () => {
  if (history.position === -1) return;
  console.log(history.position);
  switch (history["actions"][history.position].command) {
    case "edit":
      editToDo(history["actions"][history.position]["ID"], history["actions"][history.position]["oldToDo"], true);
      break;
    case "alterCompletion":
      alterCompletionOfToDoForUndoRedo(history["actions"][history.position]["ID"], true);
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
      editToDo(history["actions"][history.position + 1]["ID"], history["actions"][history.position + 1]["toDo"], false);
      break;
    case "alterCompletion":
      alterCompletionOfToDoForUndoRedo(history["actions"][history.position + 1]["ID"], false);
      break;
    default:
      break;
  }
};

export const addActions = (commandType, toDoID, toDo, oldToDo) => {
  history.actions = history.actions.slice(0, history.position + 1);
  const newAction = {
    "command": commandType,
    "ID": toDoID,
  }
  if (toDo !== undefined) {
    newAction["toDo"] = toDo;
  }
  if (oldToDo !== undefined) {
    newAction["oldToDo"] = oldToDo;
  }
  history.actions.push(newAction);
  history.position++;
  console.log(history.actions);
};