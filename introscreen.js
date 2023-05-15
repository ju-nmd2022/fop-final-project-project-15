const hair = document.getElementsByClassName('hair-color');
const torso = document.getElementsByClassName('shirt-color');
const legs = document.getElementsByClassName('ovve-color');

const namePlaceholder = document.getElementById('name');
const coursePlaceholder = document.getElementById('course');

const characterInfo = JSON.parse(localStorage.character); 

for (let i = 0; i < hair.length; i++) {
    hair[i].style.backgroundColor = characterInfo.hairColor;
}
for (let i = 0; i < torso.length; i++) {
    torso[i].style.backgroundColor = characterInfo.shirtColor;
}
for (let i = 0; i < legs.length; i++) {
    legs[i].style.backgroundColor = characterInfo.pantsColor;
}

namePlaceholder.innerText = characterInfo.name;

if (characterInfo.ovveColor === 'rgb(235, 212, 35)') { //yellow
    coursePlaceholder.innerText = 'engine';
}
if (characterInfo.ovveColor === 'rgb(26, 46, 230)') { //blue
    coursePlaceholder.innerText = 'conversation';
}
if (characterInfo.ovveColor === 'rgb(230, 26, 26)') { //red
    coursePlaceholder.innerText = 'teaching stuff';
}
if (characterInfo.ovveColor === 'rgb(255, 255, 255)') { //white
    coursePlaceholder.innerText = 'medicine';
}
if (characterInfo.ovveColor === 'rgb(5, 111, 17)') { //green
    coursePlaceholder.innerText = 'money stuff';
}
if (characterInfo.ovveColor === 'rgb(0, 0, 0)') { //black
    coursePlaceholder.innerText = 'utlandsphest';
}