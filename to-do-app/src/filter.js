import { data, queriedElements } from "/src/dataAndElements.js";

export const checkWithFilter = (toDoItem) => {
  const notAnyUrgencyApplied = data.urgencyFilter.every(
    (element) => element === 0
  );
  const notAnyCategoryApplied = data.categoryFilter.every(
    (element) => element === 0
  );
  const checked = queriedElements.notCompletedCheckBox.checked;
  if (
    (data.urgencyFilter[toDoItem.urgency] === 1 || notAnyUrgencyApplied) &&
    (data.categoryFilter[toDoItem.category] === 1 || notAnyCategoryApplied) &&
    ((checked && !toDoItem.completed) || !checked)
  ) {
    return true;
  }
  return false;
};

export const containSearchedWord = (searchedText, title) => {
  if (
    searchedText === undefined ||
    searchedText === "" ||
    title.toLowerCase().indexOf(searchedText) + 1
  ) {
    return true;
  } else {
    return false;
  }
};
