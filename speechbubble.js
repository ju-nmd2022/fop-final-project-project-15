class SpeechBubble {
    constructor(positionTop,positionLeft,bubble1,bubble2,bubble3,bubble4,bubble5,bubble6,bubble7) {
        this.positionTop = positionTop;
        this.positionLeft = positionLeft;
        this.bubble1 = bubble1;
        this.bubble2 = bubble2;
        this.bubble3 = bubble3;
        this.bubble4 = bubble4;
        this.bubble5 = bubble5;
        this.bubble6 = bubble6;
        this.bubble7 = bubble7;
    }
    createSpeechBubble() {
        pauseGame();
        const newSpeechBubbleContainer = document.createElement('div');
        const newSpeechBubble = document.createElement('div');
        const newTextContainer = document.createElement('div');
        const newText = document.createElement('p');

        newSpeechBubbleContainer.classList.add('speech-bubble-container');
        newSpeechBubble.classList.add('speech-bubble');
        newTextContainer.classList.add('text-container');
        // newText.classList.add('typing-animation');
        newText.style.animation = `typing-ani 0.4s steps(${this.bubble1.length}) 1`;

        newText.innerText = this.bubble1;

        newSpeechBubbleContainer.style.top = `${this.positionTop}vmin`;
        newSpeechBubbleContainer.style.left = `${this.positionLeft}vmin`;

        newSpeechBubbleContainer.addEventListener('click', () => {
            newText.style.animation = 'none';
            if (!this.bubble2) {endOfBubbleHandler(); screenContainer.removeChild(newSpeechBubbleContainer); return;}
            if (newText.innerText === this.bubble1) {
                newText.style.animation = `typing-ani 0.4s steps(${this.bubble2.length}) 1`;
                newText.innerText = this.bubble2;
                return;
            } 
            if (!this.bubble3) {endOfBubbleHandler(); screenContainer.removeChild(newSpeechBubbleContainer); return;}
            if (newText.innerText === this.bubble2) {
                newText.style.animation = `typing-ani 0.4s steps(${this.bubble3.length}) 1`;
                newText.innerText = this.bubble3;
                return;
            }
            if (!this.bubble4) {endOfBubbleHandler(); screenContainer.removeChild(newSpeechBubbleContainer); return;}
            if (newText.innerText === this.bubble3) {
                newText.style.animation = `typing-ani 0.4s steps(${this.bubble4.length}) 1`;
                newText.innerText = this.bubble4;
                return;
            }
            if (!this.bubble5) {endOfBubbleHandler(); screenContainer.removeChild(newSpeechBubbleContainer); return;}
            if (newText.innerText === this.bubble4) {
                newText.style.animation = `typing-ani 0.4s steps(${this.bubble5.length}) 1`;
                newText.innerText = this.bubble5;
                return;
            }
            if (!this.bubble6) {endOfBubbleHandler(); screenContainer.removeChild(newSpeechBubbleContainer); return;}
            if (newText.innerText === this.bubble5) {
                newText.style.animation = `typing-ani 0.4s steps(${this.bubble6.length}) 1`;
                newText.innerText = this.bubble6;
                return;
            }
            if (!this.bubble7) {endOfBubbleHandler(); screenContainer.removeChild(newSpeechBubbleContainer); return;}
            if (newText.innerText === this.bubble6) {
                newText.style.animation = `typing-ani 0.4s steps(${this.bubble7.length}) 1`;
                newText.innerText = this.bubble7;
                return;
            }
            endOfBubbleHandler(); screenContainer.removeChild(newSpeechBubbleContainer);
            }


        );

        newTextContainer.appendChild(newText);
        newSpeechBubble.appendChild(newTextContainer);
        newSpeechBubbleContainer.appendChild(newSpeechBubble);
        screenContainer.appendChild(newSpeechBubbleContainer);
    }
}