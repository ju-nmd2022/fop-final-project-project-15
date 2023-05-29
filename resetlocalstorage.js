const clickToStart = document.querySelector('.click-to-start-link');
const presentationModeCheck = document.getElementById('presentationModeCheck');

clickToStart.addEventListener('click',() => {
    // reset the localstorage values and add the undefined ones
    localStorage.alcoholTaskCompleted = 'false';
    localStorage.kebabTaskCompleted = 'false';
    localStorage.ovveTaskCompleted = 'false';
    localStorage.prepartyTaskCompleted = 'false';

    localStorage.bridgeCompleted = 'false';
    localStorage.akaRoadCompleted = 'false';

    localStorage.currentHour = 21;
    localStorage.currentMinute = 0;

    localStorage.prepartyPopupDisplayed = 'false';

    if (!localStorage.character || presentationModeCheck.checked) {
        localStorage.character = JSON.stringify({name: 'akko',school: 'JTH',hairColor: 'yellow',shirtColor: 'red',pantsColor: 'blue',ovveColor: 'yellowovve.png'});
    }
    if (!localStorage.unlockedPatches || presentationModeCheck.checked) {
        localStorage.unlockedPatches = JSON.stringify([]);
    }
    if (!localStorage.equippedPatches || presentationModeCheck.checked) {
        localStorage.equippedPatches = JSON.stringify([]);
    }
    if (presentationModeCheck.checked) {
        localStorage.presentationMode = 'true';
    } else {
        localStorage.presentationMode = 'false';
    }
})
