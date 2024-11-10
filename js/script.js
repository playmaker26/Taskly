let inputField = document.querySelector('#task');
let addButton = document.querySelector('.add');
let createTask = function(taskName) {
    let ul = document.querySelector('.ul-list');
    let li = document.createElement('li');
    li.classList.add('task-item');

    // Add task name inside a span, to keep it separate from icons
    let taskText = document.createElement('span');
    taskText.classList.add('task-text');
    taskText.textContent = taskName;

    // Define icons with names
    const taskOperations = [
        { iconClass: 'fa-solid fa-floppy-disk save', name: 'Save' },
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

    // Set the inner HTML for the list item and append it to the list
    li.innerHTML = `
        <figure>
            <figcaption>
                <span>${taskName}</span>
            </figcaption>
        </figure>
        ${operationHTML}
    `;

    ul.appendChild(li); // Append the task item to the list
};

// Event listener for adding a task
document.querySelector('.add').addEventListener('click', (e) => {
    e.preventDefault();
    let inputField = document.querySelector('#task');
    let taskName = inputField.value.trim();

    if (taskName === '') {
        document.querySelector('.label').style.color = '#FF0000';
        document.querySelector('.label').innerText = 'Please type a task.';
    } else {
        createTask(taskName);  // Call createTask with the input value
        inputField.value = '';  // Clear the input field
        document.querySelector('.label').style.color = '';
        document.querySelector('.label').innerText = 'Create your Task';
    }
});

inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent form submission on Enter
        let taskName = inputField.value.trim(); // Define taskName here

        // Now, taskName is defined and can be checked
        if (taskName === '') {
            document.querySelector('.label').style.color = '#FF0000';
            document.querySelector('.label').innerText = 'Please type a task.';
        } else {
            createTask(taskName); // Call createTask with the input value
            inputField.value = ''; // Clear the input field
            document.querySelector('.label').style.color = '';
            document.querySelector('.label').innerText = 'Create your Task';
        }
    }
});

