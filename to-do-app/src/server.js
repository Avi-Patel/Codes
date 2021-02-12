const success = true;

const randomBooleanValue = () => {
  const number = Math.random();
  console.log(number);
  if (number <= 0.9) return true;
  else return false;
};

export const getToDoFromDatabase = (id) => {
  return new Promise((resolve, reject) => {
    if (randomBooleanValue()) {
      resolve(
        toDos.find((toDo) => {
          return toDo.ID === id;
        })
      );
    } else {
      reject(
        "Opps!! something went wrong whiel fecthing data, plz try again after sometime"
      );
    }
  });
};

export const createToDoInDatabase = (toDo) => {
  return new Promise((resolve, reject) => {
    if (randomBooleanValue()) {
      toDos.push({ ...toDo });
      resolve();
    } else {
      reject(
        "Opps!! something went wrong at server side, plz try again after sometime"
      );
    }
  });
};

export const updateToDoInDatabase = (id, toDo) => {
  return new Promise((resolve, reject) => {
    if (randomBooleanValue()) {
      const index = toDos.forEach((toDoX, i) => {
        if (toDoX.ID === id) return i;
      });
      toDos[index] = { ...toDo };
      resolve(toDo);
    } else {
      reject("Opps!! Cannot update right now, plz try again after sometime");
    }
  });
};

export const deleteToDoFromDatabase = (id) => {
  return new Promise((resolve, reject) => {
    if (randomBooleanValue()) {
      let index = null;
      toDos.forEach((toDoX, i) => {
        if (toDoX.ID === id) index = i;
      });
      toDos.splice(index, 1);
      resolve(index);
    } else {
      reject(
        "Opps!! something went wrong while deletign TODO, plz try again after sometime"
      );
    }
  });
};

const toDos = [];
