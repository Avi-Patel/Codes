import { updateHeaderDate } from "/src/otherFunctions.js";
import { data, queriedElements } from "/src/localDataAndElements.js";
import { createAndAddTodo } from "/src/createFunctions.js";
import { displayToDos } from "/src/renderFunction.js";
import {
  updateAllToCompleted,
  deleteAllSelectedToDos,
  clearSelection
} from "/src/operationsOnToDo";

updateHeaderDate();

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
  switch (event.target.id) {
    case dataFilterIds[0]:
      dataFilter[0] ^= 1;
      changeBtnStyle(event.target, dataFilter[0]);
      break;
    case dataFilterIds[1]:
      dataFilter[1] ^= 1;
      changeBtnStyle(event.target, dataFilter[1]);
      break;
    case dataFilterIds[2]:
      dataFilter[2] ^= 1;
      changeBtnStyle(event.target, dataFilter[2]);
      break;
    default:
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
queriedElements.completeSelection.addEventListener("click", () =>
  updateAllToCompleted()
);

queriedElements.clearSelection.addEventListener("click", () =>
  clearSelection()
);
queriedElements.deleteSelection.addEventListener("click", () =>
  deleteAllSelectedToDos()
);

queriedElements.searchInput.addEventListener("input", (event) => {
  clearTimeout(timeOutID);
  const timeOutID = setTimeout(() => displayToDos(), 500);
});
queriedElements.clearBtn.addEventListener("click", () => {
  queriedElements.searchInput.value = "";
  displayToDos();
});

queriedElements.notCompletedCheckBox.addEventListener("change", () =>
  displayToDos()
);

window.addEventListener("click", (event) => {
  if (event.target.id === "updateModal") {
    event.target.remove();
  }
});
