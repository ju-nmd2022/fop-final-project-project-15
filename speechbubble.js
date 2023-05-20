class SpeechBubble {
    constructor(positionTop,positionLeft,bubble1,bubble2,bubble3,bubble4,bubble5,bubble6,bubble7,bubble8,bubble9) {
        this.positionTop = positionTop;
        this.positionLeft = positionLeft;
        this.bubble1 = bubble1;
        this.bubble2 = bubble2;
        this.bubble3 = bubble3;
        this.bubble4 = bubble4;
        this.bubble5 = bubble5;
        this.bubble6 = bubble6;
        this.bubble7 = bubble7;
        this.bubble8 = bubble8;
        this.bubble9 = bubble9;
    }
    makeNewLine(bubble) {
        if (bubble.length > 15) {
            const bubbleToArray = Array.from(bubble);
            // find the blank space closest to the middle
            let halfwayPoint;
            for (let i = Math.floor(bubbleToArray.length/2); i < bubbleToArray.length; i++) {
                if (bubbleToArray[i] === ' ') {
                    halfwayPoint = i;
                    break;
                }
            }
            const secondHalfOfBubble = bubbleToArray.splice(halfwayPoint);
            const firstLine = bubbleToArray.join('');
            const secondLine = secondHalfOfBubble.join('');
            return [firstLine,secondLine];
        } else {
            return false;
        }
    }
    createSpeechBubble() {
        pauseGame();
        const newSpeechBubbleContainer = document.createElement('div');
        const newSpeechBubble = document.createElement('div');
        const newTextContainer = document.createElement('div');
        const newText = document.createElement('p');
        const newTextLine = document.createElement('p');

        newSpeechBubbleContainer.classList.add('speech-bubble-container');
        newSpeechBubble.classList.add('speech-bubble');
        newTextContainer.classList.add('text-container');
        newText.style.animation = `typing-ani 0.4s steps(${this.bubble1.length}) 1`;
        newTextLine.style.animationDelay = '0.4s';

        newSpeechBubbleContainer.style.top = `${this.positionTop}vmin`;
        newSpeechBubbleContainer.style.left = `${this.positionLeft}vmin`;

        const testForMultipleLines = (bubble) => {
            if (this.makeNewLine(bubble)) {
                const newLines = this.makeNewLine(bubble);
                const line1 = newLines[0];
                const line2 = newLines[1];
                newText.innerText = line1;
                newTextLine.innerText = line2;
                newTextLine.style.animation = `typing-ani 0.4s steps(${line2.length}) 1`; 
            } else {
                newText.innerText = bubble;
                newTextLine.innerText = '';
            }
        }
        
        testForMultipleLines(this.bubble1);

        newSpeechBubbleContainer.addEventListener('click', () => {
            newText.style.animation = 'none';
            if (!this.bubble2) {endOfBubbleHandler(); screenContainer.removeChild(newSpeechBubbleContainer); return;}
            if (newText.innerText === this.bubble1 || newText.innerText + newTextLine.innerText === this.bubble1 || `${newText.innerText} ${newTextLine.innerText}` === this.bubble1) {
                testForMultipleLines(this.bubble2);
                newText.style.animation = `typing-ani 0.4s steps(${this.bubble2.length}) 1`;
                return;
            } 
            if (!this.bubble3) {endOfBubbleHandler(); screenContainer.removeChild(newSpeechBubbleContainer); return;}
            if (newText.innerText === this.bubble2 || newText.innerText + newTextLine.innerText === this.bubble2 || `${newText.innerText} ${newTextLine.innerText}` === this.bubble2) {
                testForMultipleLines(this.bubble3);
                newText.style.animation = `typing-ani 0.4s steps(${this.bubble3.length}) 1`;
                return;
            }
            if (!this.bubble4) {endOfBubbleHandler(); screenContainer.removeChild(newSpeechBubbleContainer); return;}
            if (newText.innerText === this.bubble3 || newText.innerText + newTextLine.innerText === this.bubble3 || `${newText.innerText} ${newTextLine.innerText}` === this.bubble3) {
                testForMultipleLines(this.bubble4);
                newText.style.animation = `typing-ani 0.4s steps(${this.bubble4.length}) 1`;
                return;
            }
            if (!this.bubble5) {endOfBubbleHandler(); screenContainer.removeChild(newSpeechBubbleContainer); return;}
            if (newText.innerText === this.bubble4 || newText.innerText + newTextLine.innerText === this.bubble4 || `${newText.innerText} ${newTextLine.innerText}` === this.bubble4) {
                testForMultipleLines(this.bubble5);
                newText.style.animation = `typing-ani 0.4s steps(${this.bubble5.length}) 1`;
                return;
            }
            if (!this.bubble6) {endOfBubbleHandler(); screenContainer.removeChild(newSpeechBubbleContainer); return;}
            if (newText.innerText === this.bubble5 || newText.innerText + newTextLine.innerText === this.bubble5 || `${newText.innerText} ${newTextLine.innerText}` === this.bubble5) {
                testForMultipleLines(this.bubble6);
                newText.style.animation = `typing-ani 0.4s steps(${this.bubble6.length}) 1`;
                return;
            }
            if (!this.bubble7) {endOfBubbleHandler(); screenContainer.removeChild(newSpeechBubbleContainer); return;}
            if (newText.innerText === this.bubble6 || newText.innerText + newTextLine.innerText === this.bubble6 || `${newText.innerText} ${newTextLine.innerText}` === this.bubble6) {
                testForMultipleLines(this.bubble7);
                newText.style.animation = `typing-ani 0.4s steps(${this.bubble7.length}) 1`;
                return;
            }
            if (!this.bubble8) {endOfBubbleHandler(); screenContainer.removeChild(newSpeechBubbleContainer); return;}
            if (newText.innerText === this.bubble7 || newText.innerText + newTextLine.innerText === this.bubble7 || `${newText.innerText} ${newTextLine.innerText}` === this.bubble7) {
                testForMultipleLines(this.bubble8);
                newText.style.animation = `typing-ani 0.4s steps(${this.bubble8.length}) 1`;
                return;
            }
            if (!this.bubble9) {endOfBubbleHandler(); screenContainer.removeChild(newSpeechBubbleContainer); return;}
            if (newText.innerText === this.bubble8 || newText.innerText + newTextLine.innerText === this.bubble8 || `${newText.innerText} ${newTextLine.innerText}` === this.bubble8) {
                testForMultipleLines(this.bubble9);
                newText.style.animation = `typing-ani 0.4s steps(${this.bubble9.length}) 1`;
                return;
            }
            endOfBubbleHandler(); screenContainer.removeChild(newSpeechBubbleContainer);
            }


        );

        newTextContainer.appendChild(newText);
        newTextContainer.appendChild(newTextLine);
        newSpeechBubble.appendChild(newTextContainer);
        newSpeechBubbleContainer.appendChild(newSpeechBubble);
        screenContainer.appendChild(newSpeechBubbleContainer);
    }
}