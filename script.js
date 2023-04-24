/* modal opening and */

const openModal = document.querySelector(".add-task-btn");
const closeModal = document.querySelector(".close");

openModal.addEventListener("click", () => {
  modal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

const modal = document.querySelector(".modal");
const addTaskForm = document.getElementById("add-task-form");

const myBtn = document.querySelector("#add-task-btn");
const searchBtn = document.getElementById("search-btn");
const refreshBtn = document.querySelector("#refresh-btn");

function addTask(taskName, priority, dueDate, status) {
  let tasks = [taskName, priority, dueDate, status];
  let li = document.createElement("li");
  li.style.background = "beige";
  li.style.padding = "10px";
  li.style.borderRadius = "10px";

  tasks.forEach(function (curr) {
    let p = document.createElement("span");
    p.textContent = curr;
    li.appendChild(p);
  });

  // Create an "Edit" button for the list item
  let editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList = `editBtn`;
  editBtn.addEventListener("click", function () {
    editTask(li, tasks, editBtn, deleteBtn);
  });
  li.appendChild(editBtn);

  // Create a "Delete" button for the list item
  let deleteBtn = document.createElement("button");
  deleteBtn.classList = `deleteBtn`;

  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function () {
    deleteTask(li, tasks);
  });
  li.appendChild(deleteBtn);

  // Add the list item to the appropriate column
  if (status == "not-started") {
    let list = document.getElementById("not-started");
    list.appendChild(li);
  } else if (status == "in-progress") {
    let list = document.getElementById("in-progress");
    list.appendChild(li);
  } else {
    let list = document.getElementById("completed");
    list.appendChild(li);
  }
}

function editTask(li, tasks, editBtn, deleteBtn) {
  let inputFields = [];
  tasks.forEach(function (curr) {
    let input = document.createElement("input");
    input.style.width = "90%";
    input.value = curr;
    inputFields.push(input);
  });

  // Replace task items with input fields
  li.innerHTML = "";
  inputFields.forEach(function (input) {
    let p = document.createElement("p");
    p.appendChild(input);
    li.appendChild(p);
  });

  // Create a "Save" button
  let saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.style.cssText =
    "width: 50%; padding: 5px; background-color: #2452ad; color:white; border: none; margin: auto;  box-shadow: 2px 2px 4px rgb(0, 0, 0); border-radius: 10px;  margin-bottom: 10px; cursor:pointer";
  saveBtn.addEventListener("click", function () {
    // Replace input fields with updated task items
    tasks = inputFields.map(function (input) {
      return input.value;
    });

    // Update list item with updated task items
    li.innerHTML = "";
    tasks.forEach(function (curr) {
      let p = document.createElement("p");
      p.textContent = curr;
      li.appendChild(p);
    });
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    li.removeChild(saveBtn);
  });
  li.appendChild(saveBtn);

  // Remove edit and delete buttons
  li.removeChild(editBtn);
  li.removeChild(deleteBtn);
}

function deleteTask(li, tasks) {
  // Find the index of the current task in the array
  let index = tasks.indexOf(li.firstChild.textContent);

  // Remove the task from the array
  if (index > -1) {
    tasks.splice(index, 1);
  }

  // Remove the list item from the DOM
  li.remove();
}

myBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const taskName = document.getElementById("task-name").value;
  const priority = document.getElementById("priority").value;
  const dueDate = document.getElementById("due-date").value;
  const status = document.getElementById("status").value;

  addTask(taskName, priority, dueDate, status);
  modal.style.display = "none";
});
