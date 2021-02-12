// const success = true;

const randomBooleanValue = () => Math.random() <= 0.9;
// const number = Math.random();
// console.log(number);
// if (number <= 0.9) return true;
// else return false;
// };

export const getToDoFromDatabase = (id) =>
  new Promise((resolve, reject) => {
    if (randomBooleanValue()) {
      resolve(toDos.find((toDo) => toDo.ID === id));
    } else {
      reject(
        "Opps!! something went wrong whiel fecthing data, plz try again after sometime"
      );
    }
  });

export const createToDoInDatabase = (toDo) =>
  new Promise((resolve, reject) => {
    if (randomBooleanValue()) {
      toDos.push({ ...toDo });
      resolve();
    } else {
      reject(
        "Opps!! something went wrong server side, plz try again after sometime"
      );
    }
  });

export const updateToDoInDatabase = (id, toDo) =>
  new Promise((resolve, reject) => {
    if (randomBooleanValue()) {
      let index = null;
      toDos.forEach((toDoX, i) => {
        if (toDoX.ID === id) index = i;
      });
      toDos[index] = { ...toDo };
      resolve(toDo);
    } else {
      reject("Opps!! Cannot update right now, plz try again after sometime");
    }
  });

export const deleteToDoFromDatabase = (id) =>
  new Promise((resolve, reject) => {
    if (randomBooleanValue()) {
      let index = toDos.forEach((toDoX, i) => {
        if (toDoX.ID === id) return i;
      });
      toDos.splice(index, 1);
      resolve(index);
    } else {
      reject(
        "Opps!! something went wrong while deletign TODO, plz try again after sometime"
      );
    }
  });

export const bulkUpdateInDatabase = (ids, updatedToDos) =>
  new Promise((resolve, reject) => {
    if (randomBooleanValue()) {
      ids.forEach((id, i) => (toDos[id] = updatedToDos[i]));
      resolve();
    } else {
      reject("Opps!! Cannot update right now, plz try again after sometime");
    }
  });

export const bulkDeleteFromDatabase = (ids) =>
  new Promise((resolve, reject) => {
    if (randomBooleanValue()) {
      ids.forEach((id) => {
        const index = toDos.forEach((toDoX, i) => {
          if (toDoX.ID === id) return i;
        });
        toDos.splice(index, 1);
      });

      resolve();
    } else {
      reject(
        "Opps!! something went wrong while deletign TODOs, plz try again after sometime"
      );
    }
  });

const toDos = [];
