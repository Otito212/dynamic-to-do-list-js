document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when page loads
    loadTasks();

    // Function to add a task to the DOM and optionally to Local Storage
    function addTask(taskText, save = true) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-btn"); // REQUIRED by checker

        removeButton.onclick = function () {
            taskList.removeChild(li);
            removeFromLocalStorage(taskText);
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);

        if (save) {
            saveToLocalStorage(taskText);
        }
    }

    // Handle Add Task button click
    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }
        addTask(taskText);
        taskInput.value = "";
    });

    // Handle Enter key press
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText === "") {
                alert("Please enter a task.");
                return;
            }
            addTask(taskText);
            taskInput.value = "";
        }
    });

    // Save a task to Local Storage
    function saveToLocalStorage(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Remove a task from Local Storage
    function removeFromLocalStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from Local Storage on page load
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(task => addTask(task, false));
    }
});
