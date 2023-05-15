const screenContainer = document.querySelector('.screen-container');

class TaskCompletion {
    constructor(taskName) {
        this.taskName = taskName;
    }
    createTaskCompletionPopup() {
        let taskImage;
        switch (this.taskName) {
            case 'Buy alcohol':
                taskImage = 'glyphs/taskicons/alcoholtask.png'
                break;
            case 'Eat a kebab':
                taskImage = 'glyphs/taskicons/kebabtask.png'
                break;
            case 'Get your ovve':
                taskImage = 'glyphs/taskicons/ovvetask.png';
                break;
            case 'Go to the preparty':
                taskImage = 'glyphs/taskicons/prepartytask.png'
                break;
        }

        const taskPopup = document.createElement('div');
        taskPopup.classList.add('task-completion-popup');

        const taskPopupIcon = document.createElement('div');
        taskPopupIcon.classList.add('task');
        const taskPopupImage = document.createElement('img');
        taskPopupImage.setAttribute('src',taskImage);
        taskPopupIcon.appendChild(taskPopupImage);

        const taskPopupTitle = document.createElement('h2');
        taskPopupTitle.innerText = this.taskName;
        taskPopup.appendChild(taskPopupIcon);
        taskPopup.appendChild(taskPopupTitle);

        screenContainer.appendChild(taskPopup);

        const taskCompletionSound = document.createElement('audio');
        const audioSource = document.createElement('source');
        audioSource.setAttribute('src','taskcompletionsound.mp3');
        audioSource.setAttribute('type','audio/mpeg');
        taskCompletionSound.appendChild(audioSource);

        taskCompletionSound.play();

        setTimeout(() => {
            taskPopupIcon.style.backgroundColor = 'green';
            taskPopupTitle.style.color = 'green';
        }, 500);
        setTimeout(() => {
            taskPopup.style.display = 'none';
        }, 3000);
    }
}