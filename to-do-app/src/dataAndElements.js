export const data = {
  counter: 0,
  allTodos: [],
  urgencyFilter: [0, 0, 0],
  categoryFilter: [0, 0, 0],
  urgencyFilterIds: ["lowUrgency", "mediumUrgency", "highUrgency"],
  categoryFilterIds: ["personalCategory", "academicCategory", "socialCategory"],
  curOnScreenSelected: [],
  completed: 0,
  urgencyIconColor: ["cgreen", "cyellow", "cred"],
  categoryIcon: ["fa-user-alt", "fa-book-open", "fa-users"],
  countCompleted: 0,
  totalCount: 0
};
export const queriedElements = {
  TDaddBtn: document.querySelector("#TDaddBtn"),
  todosBox: document.querySelector("#todosBox"),
  urgencyFilter: document.querySelector("#urgencyFilter"),
  categoryFilter: document.querySelector("#categoryFilter"),
  completeSelection: document.querySelector("#completeSelection"),
  clearSelection: document.querySelector("#clearSelection"),
  deleteSelection: document.querySelector("#deleteSelection"),
  percentageText: document.querySelector("#percentageText"),
  ratioText: document.querySelector("#ratioText"),
  searchInput: document.querySelector("#searchInput"),
  searchBtn: document.querySelector("#searchBtn"),
  notCompletedCheckBox: document.querySelector("#notCompletedCheckBox")
};
