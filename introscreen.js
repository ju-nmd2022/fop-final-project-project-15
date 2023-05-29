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

if (characterInfo.school === 'JTH') { //yellow
    coursePlaceholder.innerText = 'engine';
}
if (characterInfo.school === 'HLK (Blue)') { //blue
    coursePlaceholder.innerText = 'conversation';
}
if (characterInfo.school === 'HLK (Red)') { //red
    coursePlaceholder.innerText = 'teaching stuff';
}
if (characterInfo.school === 'Hälso') { //white
    coursePlaceholder.innerText = 'medicine';
}
if (characterInfo.school === 'JIBS') { //green
    coursePlaceholder.innerText = 'money stuff';
}
if (characterInfo.school === 'Qult') { //black
    coursePlaceholder.innerText = 'utlandsphest';
}