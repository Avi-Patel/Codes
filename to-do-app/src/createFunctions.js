import { checkAndRenderOneToDo } from "/src/renderFunction.js";
import { data } from "/src/dataAndElements.js";
export const createElement = (
  tagName,
  properties,
  styleProperties,
  textContent,
  parent
) => {
  const element = document.createElement(tagName);
  if (properties) {
    Object.keys(properties).forEach((property) => {
      element.setAttribute(property, properties[property]);
    });
  }
  if (styleProperties) {
    Object.keys(styleProperties).forEach((styleProperty) => {
      element.style.styleProperty = properties[styleProperty];
    });
  }
  if (textContent) element.textContent = textContent;
  if (parent) parent.appendChild(element);
  return element;
};

export const createToDoNode = (toDoItem) => {
  const ID = toDoItem.ID;
  const toDoNode = createElement("div", {
    class: `TDitem mar8 pad8 b12 ${
      toDoItem.completed ? "reduceOpacity" : "originalOpacity"
    }`,
    id: `ID${toDoItem.ID}`
  });
  toDoNode.innerHTML = `<div class="topTwoBtns">
    <i class="fas fa-pencil-alt cwhite iconBtn iconBtnExtra visiblyAltered" id="editToDo${ID}"></i>
    <i class="fas fa-trash-alt cwhite iconBtn iconBtnExtra visiblyAltered" id="deleteToDo${ID}"></i>
  </div>
  <div class="normalBoldTitle textCenter mar10" style="font-size: 18px;">
    ${toDoItem.title}
  </div>
  <div class="normalTitle mar10" style="font-size: 12px;">
    ${toDoItem.dateAsID}
  </div>
  <div class="TDprefrerences mar10">
    <i class="fas fa-exclamation-triangle mar8 ${
      data.urgencyIconColor[toDoItem.urgency]
    } TDicon"></i>
    <i class="fas ${data.categoryIcon[toDoItem.category]} mar8 cwhite TDicon">
    </i>
  </div>
  <button class="markCompleted greenBtn mar10" id="markCompleted${ID}">
  ${toDoItem.completed ? "Completed Undo?" : "Mark Completed"}
  </button>
  <div class="selectWhiteCircle mar8" id="selectToDo${ID}"></div>`;
  return toDoNode;
};

export const createToDo = (title, urgency, category) => {
  const toDoItem = {
    ID: data.counter++,
    dateAsID: new Date().toLocaleString(),
    title: title,
    urgency: urgency,
    category: category,
    completed: false
  };
  return toDoItem;
};

export const createAndAddTodo = () => {
  const TDTitleInput = document.querySelector("#TDTitle");
  const title = TDTitleInput.value.trim();
  TDTitleInput.value = "";
  TDTitleInput.focus();
  const urgency = document.querySelector("#urgencySelect").selectedIndex;
  const category = document.querySelector("#categorySelect").selectedIndex;

  const toDoItem = createToDo(title, urgency, category);
  data.allTodos.push(toDoItem);
  checkAndRenderOneToDo(toDoItem);
};

export const createModal = (title, urgencyIndex, categoryIndex) => {
  const urgency = ["low", "medium", "high"];
  const category = ["personal", "academic", "social"];
  const updateModal = createElement("div", {
    class: "updateModal",
    id: "updateModal"
  });
  updateModal.innerHTML = `<div class="modalContent b12 pad12">
    <div class="cwhite normalBoldTitle marTB8">Update To-Do</div>
    <input
      type="text"
      class="updateModalPreference mar10 pad12"
      id="updateToDoTitle"
      placeholder="Add ToDo Title"
      value="${title}"s/>
    <div class="normalBoldTitle mar8">Urgency</div>
    <select
      name="urgency"
      id="updatedUrgency"
      class="updateModalPreference mar10 pad12"
      value="${category[urgencyIndex]}">
      <option value="low" class="attribute">Low</option>
      <option value="medium" class="attribute">Medium</option>
      <option value="high" class="attribute">High</option>
    </select>
    <div class="normalBoldTitle mar8">Category</div>
    <select
      name="category"
      id="updatedCategory"
      class="updateModalPreference mar10 pad12"
      value="${urgency[categoryIndex]}">
      <option value="personal" class="attribute">Personal</option>
      <option value="academic" class="attribute">Academic</option>
      <option value="social" class="attribute">Social</option>
    </select>
    <div>
      <button class="greenBtn mar8" id="updateToDoBtn">Update</button>
      <button class="greenBtn mar8" id="cancelUpdateBtn">Cancel</button>
    </div>
  </div>`;

  return updateModal;
};
