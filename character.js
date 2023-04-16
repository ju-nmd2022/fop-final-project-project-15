export default class Character {
    constructor(shirtColor,ovveColor,hairColor) {
        this.hairColor = hairColor;
        this.shirtColor = shirtColor;
        this.ovveColor = ovveColor;
        this.topPosition = 0;
        this.leftPosition = 0;
    }
    moveUp() {
        this.topPosition -= 1
    }
    moveDown() {
        this.topPosition += 1
    }
    moveLeft() {
        this.leftPosition -= 1
    }
    moveRight() {
        this.leftPosition += 1
    }
}