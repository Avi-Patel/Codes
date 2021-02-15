import { checkAndRenderOneToDo } from "/src/renderFunction.js";
import { data , pushNewToDo} from "/src/localDataAndElements.js";
import { createToDoInDatabase } from "/src/server.js";
import { showSnackbar } from "/src/otherFunctions.js";
import {addActions} from "/src/history.js";
import {getDocumentElementUsingSelector} from "/src/index.js";

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
    "data-id": `ID${toDoItem.ID}`
  });

  toDoNode.innerHTML = `<div class="topTwoBtns">
    <i class="fas fa-pencil-alt cwhite iconBtn iconBtnExtra visiblyAltered" id="editToDo${ID}"></i>
    <i class="fas fa-trash-alt cwhite iconBtn iconBtnExtra visiblyAltered" id="deleteToDo${ID}"></i>
  </div>
  <div class="normalBoldTitle textCenter mar10" style="font-size: 18px;">
    ${toDoItem.title}
  </div>
  <div class="normalTitle mar10" style="font-size: 14px;">
    ${toDoItem.dateAsID}
  </div>
  <div class="TDprefrerences mar10">
    <i class="fas fa-exclamation-triangle mar8 ${
      data.urgencyIconColors[toDoItem.urgency]
    } TDicon"></i>
    <i class="fas ${data.categoryIcons[toDoItem.category]} mar8 cwhite TDicon">
    </i>
  </div>
  <button class="markCompleted greenBtn mar10" id="markCompleted${ID}">
  ${toDoItem.completed ? "Completed Undo?" : "Mark Completed"}
  </button>
  <div class="selectWhiteCircle mar8" id="selectToDo${ID}"></div>`;
  return toDoNode;
};

export const createToDoObject = (title, urgency, category) => ({
    ID: data.counter++,
    dateAsID: new Date().toLocaleString(),
    title: title,
    urgency: urgency,
    category: category,
    completed: false
  });



//split into 2 fun
export const createAndAddTodo = () => {
  const TDTitleInput = getDocumentElementUsingSelector("#TDTitle"); ;
  const title = TDTitleInput.value.trim();
  const urgency = getDocumentElementUsingSelector("#urgencySelect").selectedIndex; 
  const category =getDocumentElementUsingSelector("#categorySelect").selectedIndex;
  TDTitleInput.focus();

  const toDoItem = createToDoObject(title, urgency, category);
  createToDoInDatabase(toDoItem)
    .then(() => {
      pushNewToDo(toDoItem);
      addActions("create", [toDoItem.ID],[{...toDoItem}]);
      checkAndRenderOneToDo(toDoItem);
      TDTitleInput.value = "";
    })
    .catch((e) => {
      data.counter--;
      showSnackbar(e);
    });
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
