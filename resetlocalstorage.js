// reset the localstorage values and add the undefined ones

localStorage.alcoholTaskCompleted = 'false';
localStorage.kebabTaskCompleted = 'false';
localStorage.ovveTaskCompleted = 'false';
localStorage.prepartyTaskCompleted = 'false';

localStorage.bridgeCompleted = 'false';
localStorage.akaRoadCompleted = 'false';

if (!localStorage.character) {
    localStorage.character = JSON.stringify({name: 'akko',school: 'JTH',hairColor: 'yellow',shirtColor: 'red',pantsColor: 'blue',ovveColor: 'yellowovve.png'});
}
if (!localStorage.unlockedPatches) {
    localStorage.unlockedPatches = JSON.stringify([]);
}
if (!localStorage.equippedPatches) {
    localStorage.equippedPatches = JSON.stringify([]);
}

localStorage.currentHour = 21;
localStorage.currentMinute = 0;

localStorage.prepartyPopupDisplayed = 'false';