let characterSheets = JSON.parse(localStorage.getItem('characterSheets')) // grab character sheets from local storage, the current sheet will be appended to this on save

if (!characterSheets) { // if it doesn't exist create an empty character sheet array and save it to local storage
    localStorage.setItem('characterSheets', '[]')
    characterSheets = [] 
} 

let firstSelect = true // this is used in the get class so it doesn't auto reroll the dice on the first class select

let characterSheet = {
    name: '', // update on input change
    race: '', // raceSelectElement.value
    raceInfo: {}, // api call
    class: '', // classSelectElement.value
    classInfo: {}, // api call
    stats: {},
    modifiers: {},  
    bonuses: [],
    hitpoints: 0,
    armorClass: 0,
    skills: [], //an array of strings
}

// HTML elements
let raceSelectElement = document.querySelector('#race')
let classSelectElement = document.querySelector('#class')
let rollDice = document.querySelector('#rolldice')
let raceInfoElement = document.querySelector('#race-info')
let raceDetailsElement = document.querySelector('#race-details')
let classInfoElement = document.querySelector('#class-info')
let classSkillElement = document.querySelector('#class-skills')
let statInfoElement = document.querySelector('#stat-info')
let saveCharacterButton = document.querySelector('#save-character')
let viewSavedCharactersButton = document.querySelector('#view-saved-characters')


// Functions

function raceSearch() {
    if (raceSelectElement.value == 'select') { return } // don't preform an api call if the user selects the default option placeholder

    fetch(
        'https://www.dnd5eapi.co/api/races/' + raceSelectElement.value
    ).then(function (response) {
        return response.json()
    }).then(function (data) {

        let raceInfo = {
            name: data.name,
            bonus: data.ability_bonuses,
            speed: data.speed,
            languages: data.languages,
            proficiencies: data.starting_proficiencies,
            traits: data.traits,
        }
        characterSheet.raceInfo = raceInfo
        characterSheet.race = data.name

        // start of drawing race details
        let detailsTitle = '<h1>Details</h1><hr class="border-slate-900">'
        raceDetailsElement.innerHTML = detailsTitle

        raceDetailsElement.innerHTML += 'Speed: ' + raceInfo.speed + '<br><br>'

        // get race bonuses
        for (let i = 0; i < raceInfo.bonus.length; i++) {
            let bonusName = raceInfo.bonus[i].ability_score.name
            let bonusAmt = raceInfo.bonus[i].bonus
            
            let bonusInfo = ('Bonus To: ' + bonusName + ' of ' + bonusAmt)
            raceDetailsElement.innerHTML += bonusInfo + '<br>'

            bonusName = bonusName.toLowerCase()
            characterSheet.bonuses.push( { bonusName, bonusAmt } ) 
        }
        raceDetailsElement.innerHTML += '<br>' // new line

        // get race proficiencies
        for (let i = 0; i < raceInfo.proficiencies.length; i++) {
            let proficiencies = raceInfo.proficiencies[i]
            raceDetailsElement.innerHTML += 'Proficiency in ' + proficiencies.name + '<br>'
        }
        raceDetailsElement.innerHTML += '<br>' // new line

        // get race languages
        for (let i = 0; i < raceInfo.languages.length; i++) {
            let languages = raceInfo.languages[i]
            raceDetailsElement.innerHTML += 'Language: ' + languages.name + '<br>'
        }
        raceDetailsElement.innerHTML += '<br>' // new line

        // get race traits
        for (let i = 0; i < raceInfo.traits.length; i++) {
            let traits = raceInfo.traits[i]
            raceDetailsElement.innerHTML += 'Trait: ' + traits.name + '<br>'
        }

        let drawRaceInfo = () => {
            raceInfoElement.innerHTML = 
            `
            <h1>Race Info</h1><hr class="border-slate-900">
            <p>${data.age}<br><br>${data.alignment}<br><br>${data.size_description}</p><br>
            `
        }
        drawRaceInfo()


        // if you are adjusting class/race after rolling your dice
        if (characterSheet.race !== '' && characterSheet.class !== '') { // must select a race and a class before you can roll your stats
            getStats()
        }
    })
}

function classSearch() {
    if (classSelectElement.value == 'select') { return } // don't preform an api call if the user selects the default option placeholder

    fetch(
        'https://www.dnd5eapi.co/api/classes/' + classSelectElement.value
    ).then(function (response) {
        return response.json()
    }).then(function (data) {

        let classInfo = {
            name: data.name,
            hitdie: data.hit_die,
            skillsChoice: data.proficiency_choices[0].choose,
            skills: data.proficiency_choices[0].from.options,
            proficiencies: data.proficiencies,
            savingthrows: data.saving_throws,
            equipment: data.starting_equipment, 
            //future feature: add fetch for starting equipment options
            //future feature: add fetch for magic using classes to list starting spells

        }
        characterSheet.classInfo = classInfo
        characterSheet.class = data.name

        // start of drawing class details
        classInfoElement.innerHTML = '<h1>Details</h1><hr class="border-slate-900">'
        classSkillElement.innerHTML = `<br><h1>Skill Options (Choose ${classInfo.skillsChoice})</h1><hr class="border-slate-900">`


        classInfoElement.innerHTML += 'Hit Die: ' + classInfo.hitdie + '<br>'
        classInfoElement.innerHTML += 'Skill Choices: ' + classInfo.skillsChoice + '<br><br>'

        // class skills
        for (let i = 0; i < classInfo.skills.length; i++) {
            let classSkills = classInfo.skills[i]

            let skillName = classSkills.item.name.slice(7)
            classSkillElement.innerHTML += 
            `
            <div class="py-4 md:py-px">
                <input type="checkbox" name="${skillName}" value="${skillName}">
                <label for="${skillName}">${skillName}</label>
            </div>
            `


        }

        // class proficiencies
        for (let i = 0; i < classInfo.proficiencies.length; i++) {
            let classProficiencies = classInfo.proficiencies[i]
            if (!classProficiencies.name.match("Saving")) { // skip the saving throws, these are displayed later
                classInfoElement.innerHTML += 'Proficiency: ' + classProficiencies.name + '<br>'

            }
        }
        classInfoElement.innerHTML += '<br>'

        // class saving throws
        for (let i = 0; i < classInfo.savingthrows.length; i++) {
            let classSavingThrows = classInfo.savingthrows[i]
            classInfoElement.innerHTML += 'Saving Throw: ' + classSavingThrows.name + '<br>'

        }
        classInfoElement.innerHTML += '<br>'

        // class equipment
        for (let i = 0; i < classInfo.equipment.length; i++) {
            let classEquipment = classInfo.equipment[i]
            classInfoElement.innerHTML += 'Starting Equipment: ' + classEquipment.equipment.name + '<br>'

        }


        // if you are adjusting class/race after rolling your dice
        if (characterSheet.race !== '' && characterSheet.class !== '' &&  firstSelect === false) { // must select a race and a class before you can roll your stats
            getStats()
        } else {
            firstSelect = false
        }
    })
}

function getStats() {
    if (characterSheet.race == '' || characterSheet.class == '') { // must select a race and a class before you can roll your stats
        statInfoElement.innerHTML = 'You have to select a race and a class!'
        return 
    }

    // roll for all stats
    let statsObject = {
        str: rollStat(),
        dex: rollStat(),
        con: rollStat(),
        int: rollStat(),
        wis: rollStat(),
        cha: rollStat(),
    }

    // add race bonuses
    characterSheet.bonuses.forEach((bonus) => {
        statsObject[bonus.bonusName] += bonus.bonusAmt
    })
 
    // save statsObject to the global sheet object
    characterSheet.stats = statsObject

    let modifiersObject = {
        str: Math.floor((statsObject.str - 10) / 2),
        dex: Math.floor((statsObject.dex - 10) / 2),
        con: Math.floor((statsObject.con - 10) / 2),
        int: Math.floor((statsObject.int - 10) / 2),
        wis: Math.floor((statsObject.wis - 10) / 2),
        cha: Math.floor((statsObject.cha - 10) / 2),
    }

    // save modifiersObject to the global sheet object
    characterSheet.modifiers = modifiersObject

    // calculate armor class
    let armorClass = modifiersObject.dex + 10
    // save it
    characterSheet.armorClass = armorClass
    
    // calculate hitdie
    let hitPoints = characterSheet.classInfo.hitdie + modifiersObject.con
    // save it
    characterSheet.hitpoints = hitPoints

    let drawStats = () => {
        statInfoElement.innerHTML = 
        `
        <ul class="p-2">
            <li>Stats (With Race Bonuses)</li>
            <hr class="border-slate-900">
            <li>Strength: ${statsObject.str}</li>
            <li>Dexterity: ${statsObject.dex}</li>
            <li>Constitution: ${statsObject.con}</li>
            <li>Intelligence: ${statsObject.int}</li>
            <li>Wisdom: ${statsObject.wis}</li>
            <li>Charisma: ${statsObject.cha}</li>
        </ul>
        <ul class="p-2">
            <li>Modifiers</li>
            <hr class="border-slate-900">
            <li>Strength: ${modifiersObject.str}</li>
            <li>Dexterity: ${modifiersObject.dex}</li>
            <li>Constitution: ${modifiersObject.con}</li>
            <li>Intelligence: ${modifiersObject.int}</li>
            <li>Wisdom: ${modifiersObject.wis}</li>
            <li>Charisma: ${modifiersObject.cha}</li>
        </ul>
        <ul class="p-2">
            <li>Character</li>
            <hr class="border-slate-900">
            <li>Armor Class: ${armorClass}</li>
            <li>Hit Points: ${hitPoints}</li>
        </ul>
        `
    }
    drawStats()

    // enable the save character button
    saveCharacterButton.disabled = false

}

// save character object to charactersheets array, then push the array to localStorage
function saveCharacter() {
    if (saveCharacterButton.disabled === false) {

        if (!characterName.value || characterName.value.trim() == '') { // if name is not provided
            characterName.value = 'Unknown Wanderer'
        }
        characterSheet.name = characterName.value.trim() // characterName is defined in randomname.js
    
        let skills = classSkillElement.querySelectorAll(`input[type="checkbox"]`)
        skills.forEach((skill) => {
            if (skill.checked === true) {
                characterSheet.skills.push(skill.value)
            }
        })
    
        characterSheets.push(characterSheet)
        localStorage.setItem('characterSheets', JSON.stringify(characterSheets))

        saveCharacterButton.textContent = 'Saved!' // display feedback
        setTimeout(() => {
            saveCharacterButton.textContent = 'Save Character'
        }, 500)
    }

}

// loading saved characters
function viewSavedCharacters() {
    document.body.innerHTML = 
    `
    <h1 class="text-xl pt-20">You have no saved characters!</h1>
    <button onclick="location.assign('./')">New Character</button>
    `
    if (characterSheets.length > 0) {
        document.body.innerHTML = `<h1 class="text-xl pt-20">Characters</h1>`
        characterSheets.forEach((sheet, index) => {
            let sheetData = JSON.stringify(sheet)
            document.body.innerHTML += 
            `
            <section class="w-full flex justify-center">
                <div class="p-4 bg-slate-950/50 rounded-md hover:cursor-pointer" onclick="redirect(${index})" >
                    <h1 class="text-xl">${sheet.name} </h1>
                    <p>${sheet.race} ${sheet.class}<p>
                </div>
            </section>
            `
        })
        document.body.innerHTML += `<button class="pb-20" onclick="location.assign('./')">New Character</button>`
    }

}

function redirect(index) {
    location.assign('../sheetviewer/index.html?sheet=' + index)
}


// Event Listeners
rollDice.addEventListener('click', () => getStats())
raceSelectElement.addEventListener('change', () => raceSearch())
classSelectElement.addEventListener('change', () => classSearch())
saveCharacterButton.addEventListener('click', () => saveCharacter())
viewSavedCharactersButton.addEventListener('click', () => viewSavedCharacters())