import "/src/updateDate.js";
import { data, queriedElements } from "/src/dataAndElements.js";
import { createAndAddTodo } from "/src/createFunctions.js";
import { displayToDos } from "/src/renderFunction.js";
import {
  deleteToDo,
  updateAllToCompleted,
  removeAllFromSeleted
} from "/src/operationsOnToDo";

const changeBtnStyle = (target, selected) => {
  if (selected) {
    target.style.backgroundColor = "rgb(45, 45, 45)";
    target.style.boxShadow = "0px 0px 4px 2px white";
  } else {
    target.style.backgroundColor = "black";
    target.style.boxShadow = "";
  }
};

const updateFilter = (event, dataFilter, dataFilterIds) => {
  let anyThingChanged = true;
  if (event.target.id === dataFilterIds[0]) {
    dataFilter[0] ^= 1;
    changeBtnStyle(event.target, dataFilter[0]);
  } else if (event.target.id === dataFilterIds[1]) {
    dataFilter[1] ^= 1;
    changeBtnStyle(event.target, dataFilter[1]);
  } else if (event.target.id === dataFilterIds[2]) {
    dataFilter[2] ^= 1;
    changeBtnStyle(event.target, dataFilter[2]);
  } else {
    anyThingChanged = false;
  }
  if (anyThingChanged) displayToDos();
};

queriedElements.TDaddBtn.addEventListener("click", () => {
  if (document.querySelector("#TDTitle").value.trim().length > 0) {
    createAndAddTodo();
  }
});

queriedElements.urgencyFilter.addEventListener("click", (event) =>
  updateFilter(event, data.urgencyFilter, data.urgencyFilterIds)
);
queriedElements.categoryFilter.addEventListener("click", (event) =>
  updateFilter(event, data.categoryFilter, data.categoryFilterIds)
);
queriedElements.completeSelection.addEventListener("click", () => {
  updateAllToCompleted();
  displayToDos();
  data.curOnScreenSelected.length = 0;
});

queriedElements.clearSelection.addEventListener("click", () => {
  removeAllFromSeleted();
  displayToDos();
  data.curOnScreenSelected.length = 0;
});
queriedElements.deleteSelection.addEventListener("click", () => {
  data.curOnScreenSelected.forEach((ID) => {
    deleteToDo(ID);
  });
  data.curOnScreenSelected.length = 0;
});

queriedElements.searchInput.addEventListener("input", (event) => {
  clearTimeout(timeOutID);
  const timeOutID = setTimeout(() => {
    displayToDos();
  }, 500);
});
queriedElements.searchBtn.addEventListener("click", () => {
  queriedElements.searchInput.value = "";
  displayToDos();
});

queriedElements.notCompletedCheckBox.addEventListener("change", () => {
  displayToDos();
});

window.addEventListener("click", (event) => {
  if (event.target.id === "updateModal") {
    event.target.remove();
  }
});
