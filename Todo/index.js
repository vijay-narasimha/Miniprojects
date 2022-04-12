const taskInput = document.querySelector(".task-input input");
let todos = JSON.parse(localStorage.getItem("todo-list"));
const filters = document.querySelectorAll(".filters span");
const taskbox = document.querySelector(".task-box");
const clearAll = document.querySelector(".clear-btn");
let editId, isEditedTask;

filters.forEach((btn) => {
	btn.addEventListener("click", () => {
		document.querySelector("span.active").classList.remove("active");
		btn.classList.add("active");
		showTodo(btn.id);
	});
});
function showTodo(filter) {
	let li = "";
	if (!todos) return;
	todos.forEach((todo, id) => {
		let isCompleted = todo.status == "completed" ? "checked" : "";
		if (filter == todo.status || filter == "all") {
			li += `<li class="task">
        <label for="${id}">
            <input type="checkbox"  onClick='updateStatus(this)' id="${id}" />
            <p class="${isCompleted}">${todo.name}</p>
        </label>
        <div class="settings">
            <i onClick='showMenu(this)' class="uil uil-ellipsis-h"></i>
            <ul class="task-menu">
                <li onClick='editTask(${id},"${todo.name}")' ><i class="uil uil-pen"></i>Edit</li>
                <li onClick='deleteTask(${id})'><i class="uil uil-trash"></i>Delete</li>
                
            </ul>
        </div>
    </li>`;
		}
	});

	taskbox.innerHTML = li || `<span>you don't have any task here</span>`;
}

showTodo("all");
function deleteTask(deleteTask) {
	todos.splice(deleteTask, 1);
	localStorage.setItem("todo-list", JSON.stringify(todos));
	showTodo("all");
}
function updateStatus(selectedTask) {
	let taskName = selectedTask.parentElement.lastElementChild;
	if (selectedTask.checked) {
		taskName.classList.add("checked");
		todos[selectedTask.id].status = "completed";
	} else {
		taskName.classList.remove("checked");
		todos[selectedTask.id].status = "pending";
	}
	localStorage.setItem("todo-list", JSON.stringify(todos));
}
function editTask(taskId, taskName) {
	editId = taskId;
	isEditedTask = true;
	taskInput.value = taskName;
}
function showMenu(selectedTask) {
	let taskMenu = selectedTask.parentElement.lastElementChild;
	taskMenu.classList.add("show");
	document.addEventListener("click", (e) => {
		if (e.target.tagName != "I" && e.target != selectedTask) {
			taskMenu.classList.remove("show");
		}
	});
}
clearAll.addEventListener("click", () => {
	todos.splice(0, todos.length);
	localStorage.setItem("todo-list", JSON.stringify(todos));

	showTodo("all");
});
taskInput.addEventListener("keyup", (e) => {
	let userTask = taskInput.value.trim();
	if (e.key === "Enter" && userTask) {
		if (!isEditedTask) {
			if (!todos) {
				todos = [];
			}

			let taskInfo = { name: userTask, status: "pending" };
			todos.push(taskInfo);
		} else {
			isEditedTask = false;

			todos[editId].name = userTask;
		}
		taskInput.value = "";
		localStorage.setItem("todo-list", JSON.stringify(todos));

		showTodo("all");
	}
});
