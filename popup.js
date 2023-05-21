const popupLocation = document.querySelector('.screen-container');

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
        
        newPopupRemover.addEventListener('click', () => {
            newPopupShade.style.display = 'none';
            newPopup.style.display = 'none';
            removePopupHandler();
            unpauseGame();
        })
        
        newPopup.appendChild(newPopupText);
        newPopup.appendChild(newPopupRemover);
        if (this.link !== '') {
            const newPopupLink = document.createElement('a');
            newPopupLink.setAttribute('href',this.link);
            const newPopupLinkText = document.createElement('p');
            newPopupLinkText.innerText = `Back to ${this.link}`
            newPopupLink.appendChild(newPopupLinkText);
            newPopup.appendChild(newPopupLink);
        }
        popupLocation.appendChild(newPopupShade);
        popupLocation.appendChild(newPopup);
    }
}