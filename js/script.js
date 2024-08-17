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
    let saveIcon = document.querySelector('.save-icon');
    let Save = false;
    let completeIcon = document.querySelector('.complete-icon');
    let Complete = false;
    let deleteIcon = document.querySelector('.delete-icon');
   let Delete = false;

   saveIcon.addEventListener('click', () => {
    if(!Save) {
        Save = true;
        document.querySelector('.figure-delete').style.display = 'none';
        saveIcon.style.fill = '#FFA500';
        document.querySelector('.save-text').innerHTML= 'Unsave';
        document.querySelector('li').style.color = '#2173a6';
    }else {
        Save = false;
        document.querySelector('.figure-delete').style.display = 'flex';
        saveIcon.style.fill = '#2173a6';
        document.querySelector('.save-text').innerHTML= 'save';
        document.querySelector('li').style.color = '#000';
    }
   });
}
