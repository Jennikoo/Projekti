document.addEventListener("DOMContentLoaded", loadTodos);
document.getElementById("todo-form").addEventListener("submit", addTodo);

function addTodo(event) {
    event.preventDefault();
    const input = document.getElementById("todo-input");
    const todoText = input.value.trim();

    // Validation
    if (todoText === "") {
        alert("Please enter a task.");
        input.classList.add("error");
        return;
    } else if (todoText.length < 3) {
        alert("Task must be at least 3 characters long.");
        input.classList.add("error");
        return;
    } else {
        input.classList.remove("error");
    }

    const todoList = document.getElementById("todo-list");
    const li = document.createElement("li");
    li.innerHTML = `
        ${todoText} <button onclick="removeTodo(this)">Remove</button>
        <button onclick="toggleComplete(this)">Done</button>
    `;
    todoList.appendChild(li);
    saveTodoToLocalStorage(todoText);
    input.value = "";
}

function removeTodo(button) {
    const li = button.parentElement;
    li.remove();
    removeTodoFromLocalStorage(li.firstChild.textContent);
}

function toggleComplete(button) {
    const li = button.parentElement;
    li.classList.toggle("completed");
}

function saveTodoToLocalStorage(todo) {
    let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeTodoFromLocalStorage(todo) {
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos = todos.filter(t => t !== todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
    let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    todos.forEach(todo => {
        const todoList = document.getElementById("todo-list");
        const li = document.createElement("li");
        li.innerHTML = `
            ${todo} <button onclick="removeTodo(this)">Remove</button>
            <button onclick="toggleComplete(this)">Done</button>
        `;
        todoList.appendChild(li);
    });
}
