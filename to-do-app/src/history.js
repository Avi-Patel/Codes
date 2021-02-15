import { checkAndRenderOneToDo, displayToDos } from "/src/renderFunction.js";
import { updateToDoInDatabase, deleteToDoFromDatabase, createToDoInDatabase,bulkUpdateInDatabase } from "/src/server.js";
import { data, queriedElements } from "/src/localDataAndElements.js";
import { updateCountsForRemovedToDo } from "/src/analytics.js";
import { showSnackbar, getIndexInLocalDatabase, copyContent } from "/src/otherFunctions.js";

const history = {
  position: -1,
  actions: [],
  commands: {
    "edit": "",
    "alterCompletion": "",
    "delete": "",
    "create": "",
    "alterCompletionInBulk": "",
    "deleteInBulk": ""
  },
}

const createToDoUndoRedo = (id, toDo, isUndo) => {
  if (isUndo) {
    deleteToDoFromDatabase(id).then((index) => {
      data.allTodos.splice(index, 1);
      updateCountsForRemovedToDo(toDo);
      queriedElements.todosBox.removeChild(queriedElements.todosBox.lastChild);
      history.position--;
    })
  }
  else {
    createToDoInDatabase(toDo).then(() => {
      data.allTodos.push({ ...toDo });
      checkAndRenderOneToDo(data.allTodos[data.allTodos.length - 1]);
      history.position++;
    })
  }
}

const editToDoUndoRedo = (id, toDo, oldToDo, isUndo) => {
  let toDoCopy = {};
  if (isUndo) {
    toDoCopy = { ...oldToDo };
  }
  else {
    toDoCopy = { ...toDo };
  }
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

const deletedToDo = () => { };

// const alterCompletionOfToDoForUndoRedo = (id, isUndo) => {
//   const index = getIndexInLocalDatabase(id);
//   const updatedToDo = { ...data.allTodos[index] };
//   updatedToDo.completed = updatedToDo.completed ? false : true;
//   updateToDoInDatabase(id, updatedToDo)
//     .then((returnedToDo) => {
//       updateCountsForRemovedToDo(data.allTodos[index]);
//       copyContent(data.allTodos[index],returnedToDo);
//       // data.allTodos[index] = returnedToDo;
//       checkAndRenderOneToDo(returnedToDo);
//       if (isUndo) {
//         history.position--;
//       }
//       else {
//         history.position++;
//       }
//     })
//     .catch((e) => showSnackbar(e));
// }

const deleteInBulk = () => { };

const alterCompletionInBulkUndoRedo = (ids, isUndo) => {
  console.log("alterCompletionInBulk", ids);
  const indexs = [];
  const toDos = []
  ids.forEach((id, i) => {
    const index = getIndexInLocalDatabase(id);
    indexs.push(index);
    toDos.push({ ...data.allTodos[index] });
    toDos[i].completed = toDos[i].completed ? false : true;
  })
  bulkUpdateInDatabase(indexs, toDos).then(() => {
    indexs.forEach((index) => data.allTodos[index].completed = data.allTodos[index].completed ? false : true);
    displayToDos();
    if (isUndo) {
      history.position--;
    }
    else {
      history.position++;
    }
  })
};

export const undo = () => {
  if (history.position === -1) return;
  console.log(history.position);
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
  if (toDos !== undefined) {
    newAction["toDos"] = toDos;
  }
  if (oldToDos !== undefined) {
    newAction["oldToDos"] = oldToDos;
  }
  history.actions.push(newAction);
  history.position++;
  console.log(history.position, history.actions[history.position]);
};