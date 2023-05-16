const screenContainer = document.querySelector('.screen-container');

class Popup {
    constructor(description, removeText,link) {
        this.description = description;
        this.removeText = removeText;
        this.link = link;
    }
    createPopup() {
        pauseGame();
        const newPopupShade = document.createElement('div');
        newPopupShade.classList.add('popup-shade');
        const newPopup = document.createElement('div');
        newPopup.classList.add('popup');
        const newPopupText = document.createElement('p');
        newPopupText.innerText = this.description;
        const newPopupRemover = document.createElement('p');
        newPopupRemover.classList.add('remove-popup');
        newPopupRemover.innerText = this.removeText;
        const newPopupLink = document.createElement('a');
        newPopupLink.setAttribute('href',this.link);
        const newPopupLinkText = document.createElement('p');
        newPopupLinkText.innerText = `Back to ${this.link}`

        newPopupRemover.addEventListener('click', () => {
            newPopupShade.style.display = 'none';
            newPopup.style.display = 'none';
            removePopupHandler();
            unpauseGame();
        })
        
        newPopupLink.appendChild(newPopupLinkText);
        newPopup.appendChild(newPopupText);
        newPopup.appendChild(newPopupRemover);
        newPopup.appendChild(newPopupLink);
        screenContainer.appendChild(newPopupShade);
        screenContainer.appendChild(newPopup);
    }
}