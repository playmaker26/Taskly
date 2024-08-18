let addTask = function () {
    let addButton = document.querySelector('.btn-list');
    let input = document.querySelector('.input-list');
    let ulList = document.querySelector('.ul-list');
    let label = document.querySelector('.label')
    addButton.addEventListener('click', () => {
        if(input.value.trim() === '') {
            label.style.color = '#FF0000';
            label.innerHTML = 'Please create task.';
            input.style.border = '1px solid #FF0000';
            input.classList.add('error');
        }else {
            label.innerHTML = '';
            input.style.border = '';
            input.classList.remove('error');

            let li = document.createElement('li');
            li.innerHTML = input.value;
            ulList.appendChild(li);
            li.innerHTML = `
            ${input.value}
            <div class= 'list-status'>
            <figure class= 'figure-save'>
            <svg class= 'save-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-242.7c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32L64 32zm0 96c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32L96 224c-17.7 0-32-14.3-32-32l0-64zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
            <figcaption>
            <p class= 'save-text'>Save</p>
            </figcaption>
            </figure>

            <figure class='figure-complete'>
<svg class= 'complete-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
            <figcaption>
            <p class= 'complete-text'>Complete</p>
            </figcaption>
            </figure>

            <figure class='figure-delete'>
            <svg class='delete-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"/></svg>
            <figcaption>
            <p class='delete-text'>Delete</p>
            </figcaption>
            </figure>
            </div>
            `
            listStatus();
        }
    });

    input.addEventListener('click', () => {
        if(input.classList.contains('error')) {
            label.innerHTML = 'Create a new task';
            label.style.color = '#000000';
            input.style.border = '';
            input.classList.remove('error');
        }
    });
}
addTask();


let listStatus = function() {
    document.querySelectorAll('.figure-save').forEach((saveFigure) => {
        saveFigure.addEventListener('click', function() {
            let li = this.closest('li');
            let deleteFigure = li.querySelector('.figure-delete');
            let saveIcon = li.querySelector('.save-icon');
            let saveText = li.querySelector('.save-text');

            if (!li.dataset.saved || li.dataset.saved === "false") {
                li.dataset.saved = "true";
                saveIcon.style.fill = '#FFA500';
                saveText.innerHTML = 'Unsave';
                li.style.color = '#2173a6';
                deleteFigure.style.display = 'none';
            } else {
                li.dataset.saved = "false";
                saveIcon.style.fill = '#2173a6';
                saveText.innerHTML = 'Save';
                li.style.color = '#000000';
                deleteFigure.style.display = 'flex';
            }
        });
    });

    document.querySelectorAll('.figure-complete').forEach((completeFigure) => {
        completeFigure.addEventListener('click', function() {
            let li = this.closest('li');
            let saveFigure = li.querySelector('.figure-save');
            let completeIcon = li.querySelector('.complete-icon');
            let completeText = li.querySelector('.complete-text');

            if (!li.dataset.completed || li.dataset.completed === "false") {
                li.dataset.completed = "true";
                completeIcon.style.fill = '#FFA500';
                completeText.innerHTML = 'Incomplete';
                li.style.color = '#00ff00';
                saveFigure.style.display = 'none';
            } else {
                li.dataset.completed = "false";
                completeIcon.style.fill = '#00ff00';
                completeText.innerHTML = 'Complete';
                li.style.color = '#000000';
                saveFigure.style.display = 'flex';
            }
        });
    });

    // Reworked delete event listener
    document.querySelectorAll('.figure-delete').forEach((deleteFigure) => {
        deleteFigure.addEventListener('click', function() {
            let li = this.closest('li');

            // If the task is saved, show an alert
            if (li.dataset.saved === "true") {
                alert('This task is saved. Unsave the task to delete.');
                return; // Stop further execution
            }

            // Show the modal for deletion confirmation
            let { dialog, overlay } = modal();

            dialog.showModal();

            // Handle delete confirmation
            dialog.querySelector('.delete-btn').addEventListener('click', () => {
                li.remove();  // Remove the task only after confirmation
                dialog.close();
                document.body.removeChild(dialog);
                document.body.removeChild(overlay);
            });

            // Handle cancel action
            dialog.querySelector('.cancel-btn').addEventListener('click', () => {
                dialog.close();
                document.body.removeChild(dialog);
                document.body.removeChild(overlay);
            });

            // Close modal if overlay is clicked
            overlay.addEventListener('click', () => {
                dialog.close();
                document.body.removeChild(dialog);
                document.body.removeChild(overlay);
            });
        });
    });
};






let modal = function() {
    let dialog = document.createElement('dialog');
    dialog.classList.add('modal');
    let overlay = document.createElement('div');
    overlay.classList.add('overlay');

    dialog.innerHTML = `
        <p>Are you sure you want to delete this task?</p>
        <article>
            <button class='delete-btn'>Delete</button>
            <button class='cancel-btn'>Cancel</button>
        </article>
    `;

    document.body.appendChild(dialog);
    document.body.appendChild(overlay);

    return { dialog, overlay };
};

let handleDelete = function(deleteFigure) {
    deleteFigure.addEventListener('click', function(event) {
        event.preventDefault();  // Prevent any default action (like a form submission or link following)
        
        let listItem = this.closest('li');
        let { dialog, overlay } = modal();  // Create and show the modal

        dialog.showModal();  // Display the modal

        // Handle delete confirmation
        dialog.querySelector('.delete-btn').addEventListener('click', () => {
            listItem.remove();  // Remove the task only after confirmation
            dialog.close();  // Close the dialog
            document.body.removeChild(dialog);  // Remove dialog from DOM
            document.body.removeChild(overlay);  // Remove overlay from DOM
        });

        // Handle cancel action
        dialog.querySelector('.cancel-btn').addEventListener('click', () => {
            dialog.close();  // Close the dialog
            document.body.removeChild(dialog);  // Remove dialog from DOM
            document.body.removeChild(overlay);  // Remove overlay from DOM
        });

        // Close modal if overlay is clicked
        overlay.addEventListener('click', () => {
            dialog.close();  // Close the dialog
            document.body.removeChild(dialog);  // Remove dialog from DOM
            document.body.removeChild(overlay);  // Remove overlay from DOM
        });
    });
};

document.querySelectorAll('.figure-delete').forEach(handleDelete);
