/*let inputField = document.querySelector('#task');
let addButton = document.querySelector('.add');
let ul = document.querySelector('.ul-list');

// Load tasks from local storage on page load
window.addEventListener('load', loadTasksFromStorage);

// Function to create a task item
let createTask = function(taskName, isSaved = false) {
    let li = document.createElement('li');
    li.classList.add('task-item');

    // Create task text
    let taskText = document.createElement('span');
    taskText.classList.add('task-text');
    taskText.textContent = taskName;

    // Define icons with names
    const taskOperations = [
        { iconClass: 'fa-solid fa-floppy-disk save', name: isSaved ? 'Unsave' : 'Save' },
        { iconClass: 'fa-solid fa-pen-to-square edit', name: 'Edit' },
        { iconClass: 'fa-solid fa-square-check complete', name: 'Complete' },
        { iconClass: 'fa-solid fa-trash-can delete', name: 'Delete' }
    ];

    // Generate HTML for operations
    let operationHTML = `
        <div class="operation-container">
            ${taskOperations.map(op => `
                <figure>
                    <i class="${op.iconClass}"></i>
                    <figcaption>${op.name}</figcaption>
                </figure>
            `).join('')}
        </div>
    `;

    li.innerHTML = `
        <figure>
            <figcaption>
                <span class="task-text">${taskName}</span>
            </figcaption>
        </figure>
        ${operationHTML}
    `;

    ul.appendChild(li);

    // Set initial style if it's a saved task
    const saveIcon = li.querySelector('.save');
    const editIcon = li.querySelector('.edit');
    const saveText = saveIcon.nextElementSibling;
    const taskTextElement = li.querySelector('.task-text');
    
    if (isSaved) {
        taskTextElement.style.color = '#28a745'; // Set color to green if saved
        saveText.innerText = 'Unsave';
    }

    // Attach save functionality to the save icon
    saveIcon.addEventListener('click', () => toggleSaveTask(taskName, taskTextElement, saveIcon));
    //edit functionality
    editIcon.addEventListener('click', () => editTask(taskTextElement, li));
};

// Load saved tasks from local storage
function loadTasksFromStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        let taskName = localStorage.key(i);
        let taskData = JSON.parse(localStorage.getItem(taskName));
        if (taskData && taskData.saved) {
            createTask(taskName, true);
        }
    }
}

// Toggle save/unsave task
function toggleSaveTask(taskName, taskTextElement, saveIcon) {
    const saveText = saveIcon.nextElementSibling;

    if (localStorage.getItem(taskName)) {
        // Remove task from local storage to "unsave" it
        localStorage.removeItem(taskName);
        taskTextElement.style.color = ''; // Reset color to default
        saveText.innerText = 'Save'; // Change text back to "Save"
    } else {
        // Save task to local storage to "save" it
        localStorage.setItem(taskName, JSON.stringify({ saved: true }));
        taskTextElement.style.color = '#28a745'; // Set text color to green
        saveText.innerText = 'Unsave'; // Change text to "Unsave"
    }
}

// Event listener for adding a new task
addButton.addEventListener('click', (e) => {
    e.preventDefault();
    let taskName = inputField.value.trim();
    
    if (taskName === '') {
        document.querySelector('.label').style.color = '#FF0000';
        document.querySelector('.label').innerText = 'Please type a task.';
    } else {
        createTask(taskName); // Create task item
        inputField.value = ''; // Clear input field
        document.querySelector('.label').style.color = '';
        document.querySelector('.label').innerText = 'Create your Task';
    }
});

// Add "Enter" key support for task creation
inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addButton.click();
    }
});


// Edit task functionality
function editTask(taskTextElement, li) {
    let originalTaskName = taskTextElement.textContent; // Save the original task name
    inputField.value = originalTaskName; // Move task name to input field for editing
    inputField.style.color = '#2196f3'; // Change input field text color to indicate editing
    taskTextElement.style.display = 'none'; // Hide the original task text

    // Change the addButton functionality to update the task
    addButton.removeEventListener('click', addNewTask);
    addButton.addEventListener('click', () => updateTask(originalTaskName, taskTextElement, li));

    // Handle "Enter" key for task update
    inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            updateTask(originalTaskName, taskTextElement, li);
        }
    });
}

// Update task after editing
function updateTask(originalTaskName, taskTextElement, li) {
    let updatedTaskName = inputField.value.trim();

    if (updatedTaskName !== '') {
        taskTextElement.textContent = updatedTaskName; // Update the task text
        inputField.value = ''; // Clear the input field
        taskTextElement.style.display = 'inline'; // Show the updated task text

        // Update task in local storage
        localStorage.setItem(updatedTaskName, JSON.stringify({ saved: false }));

        // Reset input field text color and task text color back to default (black)
        inputField.style.color = ''; // Reset input field color
        taskTextElement.style.color = ''; // Reset task text color

        // Restore addButton functionality to add a new task
        addButton.removeEventListener('click', () => updateTask(originalTaskName, taskTextElement, li));
        addButton.addEventListener('click', (e) => {
            e.preventDefault();
            addNewTask();
        });
    } else {
        alert('Task cannot be empty'); // Prevent saving empty task
    }
}

// Modify the original addNewTask function, if necessary
function addNewTask() {
    let taskName = inputField.value.trim();

    if (taskName !== '') {
        createTask(taskName); // Create the task
        inputField.value = ''; // Clear the input field
    }
}*/

let inputField = document.querySelector('#task');
let addButton = document.querySelector('.add');
let ul = document.querySelector('.ul-list');

// Track the index of the task being edited
let currentEditIndex = null;  

// Load tasks from local storage on page load
window.addEventListener('load', loadTasksFromStorage);

// Function to create a new task
let createTask = function(taskName, index, isSaved = false) {
    let li = document.createElement('li');
    li.classList.add('task-item');
    li.dataset.index = index;  // Assign an index to the task for identification

    // Create task text
    let taskText = document.createElement('span');
    taskText.classList.add('task-text');
    taskText.textContent = taskName;

    // Define task operations (save, edit, complete, delete)
    const taskOperations = [
        { iconClass: 'fa-solid fa-floppy-disk save', name: isSaved ? 'Unsave' : 'Save' },
        { iconClass: 'fa-solid fa-pen-to-square edit', name: 'Edit' },
        { iconClass: 'fa-solid fa-square-check complete', name: 'Complete' },
        { iconClass: 'fa-solid fa-trash-can delete', name: 'Delete' }
    ];

    // Add operations container
    let operationHTML = ` 
        <div class="operation-container">
            ${taskOperations.map(op => `
                <figure>
                    <i class="${op.iconClass}"></i>
                    <figcaption>${op.name}</figcaption>
                </figure>
            `).join('')}
        </div>
    `;

    li.innerHTML = `
        <figure>
            <figcaption>
                <span class="task-text">${taskName}</span>
            </figcaption>
        </figure>
        ${operationHTML}
    `;

    ul.appendChild(li);

    // Set task colors based on its saved status
    const saveIcon = li.querySelector('.save');
    const editIcon = li.querySelector('.edit');
    const saveText = saveIcon.nextElementSibling;
    const taskTextElement = li.querySelector('.task-text');
    
    if (isSaved) {
        taskTextElement.style.color = '#28a745'; // Set color to green if saved
        saveText.innerText = 'Unsave';
    }

    // Save functionality
    saveIcon.addEventListener('click', () => toggleSaveTask(taskName, taskTextElement, saveIcon));
    
    // Edit functionality
    editIcon.addEventListener('click', () => editTask(taskTextElement, li, taskName, index));

    // Add delete functionality
    const deleteIcon = li.querySelector('.delete');
    deleteIcon.addEventListener('click', () => deleteTask(taskName, li));
};

// Load saved tasks from local storage
function loadTasksFromStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        let taskName = localStorage.key(i);
        let taskData = JSON.parse(localStorage.getItem(taskName));
        if (taskData) {
            createTask(taskName, i, taskData.saved);
        }
    }
}

// Toggle save/unsave task in local storage
function toggleSaveTask(taskName, taskTextElement, saveIcon) {
    const saveText = saveIcon.nextElementSibling;

    if (localStorage.getItem(taskName)) {
        // Remove task from local storage (unsave)
        localStorage.removeItem(taskName);
        taskTextElement.style.color = ''; // Reset color
        saveText.innerText = 'Save'; // Change to "Save"
    } else {
        // Save task to local storage
        localStorage.setItem(taskName, JSON.stringify({ saved: true }));
        taskTextElement.style.color = '#28a745'; // Green color for saved task
        saveText.innerText = 'Unsave'; // Change to "Unsave"
    }
}

// Function to delete a task
function deleteTask(taskName, li) {
    localStorage.removeItem(taskName); // Remove task from local storage
    ul.removeChild(li); // Remove task from the list
}

// Event listener for adding a new task
addButton.addEventListener('click', (e) => {
    e.preventDefault();
    let taskName = inputField.value.trim();

    if (taskName === '') {
        document.querySelector('.label').style.color = '#FF0000';
        document.querySelector('.label').innerText = 'Please type a task.';
    } else {
        if (currentEditIndex !== null) {
            updateTask(taskName); // Update task if editing
        } else {
            createNewTask(taskName); // Create new task if not editing
        }
        inputField.value = ''; // Clear input field
        document.querySelector('.label').style.color = '';
        document.querySelector('.label').innerText = 'Create your Task';
    }
});

// Handle "Enter" key to create or update task
inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addButton.click();
    }
});

// Edit task functionality
function editTask(taskTextElement, li, originalTaskName, index) {
    // Set the task being edited and populate the input field
    currentEditIndex = index;
    inputField.value = originalTaskName;
    inputField.style.color = '#2196f3'; // Change color of input to indicate editing
    taskTextElement.style.display = 'none'; // Hide task name
    inputField.focus(); // Focus on input field
}

// Update task when editing
function updateTask(updatedTaskName) {
    let li = ul.children[currentEditIndex];
    let taskTextElement = li.querySelector('.task-text');
    
    if (updatedTaskName.trim() === '') {
        alert('Task name cannot be empty!');
        return;
    }

    // Update the task in the list and in local storage
    taskTextElement.textContent = updatedTaskName;
    localStorage.setItem(updatedTaskName, JSON.stringify({ saved: false }));

    // Reset the task edit state
    currentEditIndex = null;
    inputField.style.color = ''; // Reset color
    taskTextElement.style.display = 'inline'; // Show the updated task name
}

// Create a new task and add it to the list
function createNewTask(taskName) {
    let taskIndex = ul.children.length;
    createTask(taskName, taskIndex);
    localStorage.setItem(taskName, JSON.stringify({ saved: false }));
}
