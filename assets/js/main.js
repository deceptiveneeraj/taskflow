// Load Task on Page Load
document.addEventListener("DOMContentLoaded", loadTasks);

// Global List Container
const taskList = document.getElementById("taskList");
// Current editing task id (null when creating new tasks)
let editingId = null;

// Add and Save task to local Storage
function saveTask() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if(title.trim() === "" || content.trim() === "") {
        alert("Fill Title and Content both are Mandatory");
        return;
    }

    // Get Existing Tasks or Create an Empty Array
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (editingId === null) {
        // Create Object for new task
        const newTask = {
            id: tasks.length + 1,
            title : title,
            content : content
        };

        // Add in Array and save
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Show task without refresh
        emptyMessage.style.display = "none";
        appendTask(newTask);
    } else {
        // Update existing task
        const index = tasks.findIndex(t => t.id === editingId);
        if (index !== -1) {
            tasks[index].title = title;
            tasks[index].content = content;
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }

        // Reset editing state and reload list
        editingId = null;
        document.querySelector(".add-btn").innerText = "Add Task";
        document.getElementById("cancel-btn").style.display = "none";
        loadTasks();
    }

    // Clear inputs
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
}

// Display a single Task
function appendTask(task) {
    const div = document.createElement("div");
    div.classList.add("task-item");
    div.dataset.id = task.id;

    div.innerHTML = `
        <input type = "checkbox" class="task-check">
        <h3 class="task-id" style="display:none">${task.id}</h3>
        <h3 class="task-title">${task.title}</h3>
        <p class="task-content">${task.content}</p>
        <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        <hr>
    `;
    taskList.appendChild(div);
}

// Load All Task
function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = "";

    const emptyMessage = document.getElementById("emptyMessage");

    if (tasks.length === 0) {
        emptyMessage.style.display = "block";  
    } else {
        emptyMessage.style.display = "none"; 
        tasks.forEach(task => appendTask(task)); 
    }
}

// Delete Task
function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Remove Task
    tasks = tasks.filter(task => task.id !== id);

    // Re-assign id
    tasks = tasks.map((task, index) => ({
        ...task,
        id: index + 1
    }));

    // Save Updateed tasks
    localStorage.setItem("tasks", JSON.stringify(tasks));

    loadTasks();
}

// Add strikethrough on checkbox
document.addEventListener("change", function(e) {
    if(e.target.classList.contains("task-check")) {
        const taskItem = e.target.closest(".task-item");
        const h3 = taskItem.querySelector("h3:not([style*='display'])");
        const p = taskItem.querySelector("p");
        
        if(e.target.checked) {
            h3.style.textDecoration = "line-through";
            p.style.textDecoration = "line-through";
            h3.style.color = "gray";
            p.style.color = "gray";
        } else {
            h3.style.textDecoration = "none";
            p.style.textDecoration = "none";
        }
    }
});

// Edit Task
function editTask(id) {
    // complete edit task ?
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(t => t.id === id);

    if(!task) return;

    // Populate inputs and set editing state
    document.getElementById("title").value = task.title;
    document.getElementById("content").value = task.content;

    editingId = id;

    // Update UI - change Add button to Update and show Cancel
    document.querySelector(".add-btn").innerText = "Update Task";
    document.getElementById("cancel-btn").style.display = "inline-block";
}

// Cancel editing and reset form
function cancelEdit() {
    editingId = null;
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    document.querySelector(".add-btn").innerText = "Add Task";
    document.getElementById("cancel-btn").style.display = "none";
}