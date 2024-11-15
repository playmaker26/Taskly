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
    const completeIcon = li.querySelector('.complete');
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

    completeIcon.addEventListener('click', () => toggleCompleteTask(taskTextElement, completeIcon));

    // Add delete functionality
    const deleteIcon = li.querySelector('.delete');
    deleteIcon.addEventListener('click', () => deleteTask(taskName, li));
};

// Load tasks from storage and only display saved tasks
function loadTasksFromStorage() {
    ul.innerHTML = ''; // Clear list
    for (let i = 0; i < localStorage.length; i++) {
        let taskName = localStorage.key(i);
        let taskData = JSON.parse(localStorage.getItem(taskName));
        if (taskData && taskData.saved) {
            createTask(taskName, i, taskData.saved);
        }
    }
}

// Toggle save/unsave for a task
function toggleSaveTask(taskName, taskTextElement, saveIcon) {
    const saveText = saveIcon.nextElementSibling;
    const currentTaskName = taskTextElement.textContent;

    if (localStorage.getItem(currentTaskName)) {
        // Unsave task and remove from localStorage
        localStorage.removeItem(currentTaskName);
        taskTextElement.style.color = '';
        saveText.innerText = 'Save';
    } else {
        // Save task in localStorage
        localStorage.setItem(currentTaskName, JSON.stringify({ saved: true }));
        taskTextElement.style.color = '#28a745';
        saveText.innerText = 'Unsave';
    }
}

// Delete a task from UI and localStorage
function deleteTask(taskName, li) {
    localStorage.removeItem(taskName); // Remove from storage
    ul.removeChild(li); // Remove from list
}

// Create or update a task
addButton.addEventListener('click', (e) => {
    e.preventDefault();
    let taskName = inputField.value.trim();

    if (taskName === '') {
        document.querySelector('.label').style.color = '#FF0000';
        document.querySelector('.label').innerText = 'Please type a task.';
    } else {
        if (currentEditIndex !== null) {
            updateTask(taskName); // Update if editing
        } else {
            createNewTask(taskName); // Create new if not editing
        }
        inputField.value = ''; // Clear input field
        document.querySelector('.label').style.color = '';
        document.querySelector('.label').innerText = 'Create your Task';
    }
});

// Edit task and remove original from storage
function editTask(taskTextElement, li, originalTaskName, index) {
    currentEditIndex = index;
    inputField.value = originalTaskName;
    inputField.style.color = '#2196f3';
    taskTextElement.style.display = 'none';
    inputField.focus();
    // Remove from storage
    localStorage.removeItem(originalTaskName);
}

// Update task in UI and storage
// Update task in UI and storage
function updateTask(updatedTaskName) {
    if (updatedTaskName.trim() === '') {
        alert('Task name cannot be empty!');
        return;
    }

    // Identify the task being edited and remove the old version from the list
    let li = ul.children[currentEditIndex];
    let taskTextElement = li.querySelector('.task-text');
    const originalTaskName = taskTextElement.textContent;

    // Remove the original task from localStorage before updating
    localStorage.removeItem(originalTaskName);

    // Update the task text in the DOM
    taskTextElement.textContent = updatedTaskName;

    // Mark as unsaved by default
    taskTextElement.style.color = ''; // Reset text color for unsaved task

    // Reset the save text (which should be initially "Save")
    const saveIcon = li.querySelector('.save');
    const saveText = saveIcon.nextElementSibling;
    saveText.innerText = 'Save'; // Reset to 'Save' text as it's not saved yet

    // Reset editing state
    currentEditIndex = null;
    inputField.style.color = '';
    inputField.value = '';
    taskTextElement.style.display = 'inline';
}


// Create a new task and add to list without saving
function createNewTask(taskName) {
    let taskIndex = ul.children.length;
    createTask(taskName, taskIndex);
}

function toggleCompleteTask(taskTextElement, completeIcon) {
    const completeText = completeIcon.nextElementSibling;
    const isComplete = taskTextElement.style.color === 'rgb(255, 215, 0)'; // Check if the color is gold

    if (isComplete) {
        taskTextElement.style.color = ''; // Reset to default
        completeText.innerText = 'Complete';
    } else {
        taskTextElement.style.color = '#ffd700'; // Set to gold
        completeText.innerText = 'Incomplete';
    }
}

function deleteTask(taskName, li) {
    const saveText = li.querySelector('.save').nextElementSibling;

    if (saveText.innerText === 'Unsave') {
        alert('This task is saved. Please unsave it before deleting.');
        return;
    }

    // Create the modal element
    const modal = document.createElement('dialog');
    modal.innerHTML = `
        <p>Are you sure you want to delete this task?</p>
        <div>
            <button class="confirm">Confirm</button>
            <button class="cancel">Cancel</button>
        </div>
    `;

    // Append the modal to the body
    document.body.appendChild(modal);

    // Show the modal
    modal.showModal();

    // Select confirm and cancel buttons
    const confirmButton = modal.querySelector('.confirm');
    const cancelButton = modal.querySelector('.cancel');

    // Confirm deletion
    confirmButton.onclick = () => {
        li.remove(); // Remove the task
        modal.close(); // Close the modal
        modal.remove(); // Remove modal from DOM
    };

    // Cancel deletion
    cancelButton.onclick = () => {
        modal.close(); // Close the modal
        modal.remove(); // Remove modal from DOM
    };
}
