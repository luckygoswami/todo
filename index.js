import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://todo-prsnl-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const tasksInDb = ref(database, "tasks");

const addBtn = document.querySelector(".add-btn");
const inputField = document.querySelector(".input-box");
const tasksList = document.querySelector(".tasks-list");
// const task = document.querySelectorAll("li");

addBtn.addEventListener("click", () => {
  let inputValue = inputField.value;
  clearInputField();

  push(tasksInDb, inputValue);
});

onValue(tasksInDb, function (snapshot) {
  if (snapshot.exists()) {
    let tasksArray = Object.entries(snapshot.val());
    console.log(tasksArray);

    clearShoppingList();

    for (let i = 0; i < tasksArray.length; i++) {
      let currentItem = tasksArray[i];
      // let itemId = currentItem[0];
      // let itemValue = currentItem[1];

      appendTaskToTheList(currentItem);
    }
  } else {
    tasksList.innerHTML = "No tasks yet...";
  }
});

function clearShoppingList() {
  tasksList.innerHTML = "";
}

function clearInputField() {
  inputField.value = "";
}

function appendTaskToTheList(task) {
  let taskId = task[0];
  let taskValue = task[1];

  let newTask = document.createElement("li");
  newTask.textContent = taskValue;
  tasksList.append(newTask);

  newTask.addEventListener("click", () => {
    let exactLocationOfItem = ref(database, `tasks/${taskId}`);

    remove(exactLocationOfItem);
  });
}
