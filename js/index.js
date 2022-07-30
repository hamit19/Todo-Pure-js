// Selectors
const todoInput = document.querySelector(".todo-input");
const addBnt = document.querySelector(".add-todo");
const todoListUl = document.querySelector(".todo-list-ul");
const filterBtn = document.querySelector(".filter-todos");

// event listeners
document.addEventListener("DOMContentLoaded", todoLocalGet);
addBnt.addEventListener("click", addTodo);
todoListUl.addEventListener("click", removeComplete);

// functions

//function for addBnt event
function addTodo(e) {
  e.preventDefault();

  const todoDiv = document.createElement("div");

  //initializes the li element
  let li = `
  <li class="todo">
    <span class="todo-title"> ${todoInput.value} </span>
    <div class="actions">
      <span>
        <i class="fa-solid fa-trash-can"></i>
      </span>
      <span>
        <i class="fa-solid fa-pen-to-square"></i>
      </span>
      <span>
        <i class="fa-solid fa-square-check"></i>
      </span>
    </div>
  </li>
  `;

  todoDiv.innerHTML = li;

  // append the li to the ul element
  todoListUl.appendChild(todoDiv);

  // saving the todoInput value to the localStorage
  todoLocalSave(todoInput.value);

  todoInput.value = "";
}

// the function below removes or completes the todo
function removeComplete(e) {
  const classList = [...e.target.classList];

  const todo = e.target.parentElement.parentElement.parentElement;

  if (classList[1] === "fa-trash-can") {
    removeLocalTodo(todo);
    todo.remove();
  } else if (classList[1] === "fa-square-check") {
    todo.classList.toggle("completed");
    todo.parentElement.classList.toggle("completed");
  }
}

// the function below filters todoList by what the user asks
function filterTodoLists(e) {
  const todos = [...todoListUl.childNodes];

  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        todo.classList.contains("completed")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none");
        break;

      case "unCompleted":
        todo.classList.contains("completed")
          ? (todo.style.display = "none")
          : (todo.style.display = "flex");
        break;
    }
  });
}

function todoLocalSave(todo) {
  let localSaved = localStorage.getItem("todo")
    ? JSON.parse(localStorage.getItem("todo"))
    : [];

  localSaved.push(todo);
  localStorage.setItem("todo", JSON.stringify(localSaved));
}

function todoLocalGet() {
  let localSaved = localStorage.getItem("todo")
    ? JSON.parse(localStorage.getItem("todo"))
    : [];

  localSaved.forEach((todo) => {
    const todoDiv = document.createElement("div");

    //initializes the li element
    let li = `
      <li class="todo">
        <span class="todo-title"> ${todo} </span>
        <div class="actions">
          <span>
            <i class="fa-solid fa-trash-can"></i>
          </span>
          <span>
            <i class="fa-solid fa-pen-to-square"></i>
          </span>
          <span>
            <i class="fa-solid fa-square-check"></i>
          </span>
        </div>
      </li>
  `;

    todoDiv.innerHTML = li;

    // append the li to the ul element
    todoListUl.appendChild(todoDiv);
  });
}

function removeLocalTodo(todo) {
  localSaved = localStorage.getItem("todo")
    ? JSON.parse(localStorage.getItem("todo"))
    : [];

  let filteredLocalTodo = localSaved.filter(
    (t) => t !== todo.children[0].innerText
  );

  localStorage.setItem("todo", JSON.stringify(filteredLocalTodo));
}
