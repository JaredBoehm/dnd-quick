// TODO: Function that saves this to Local Storage
let characterSheets = [] // Save this to Local Storage, the last characterSheet object in the array will be the last creation session (to save creation progress) 

// will need to keep track of the current index in characterSheets to update the current obj (can reopen and edit sheet?), if loading the creator again the last obj in the array the is last session
// Character sheet object, push to characterSheets[] to save progress
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

        // start of drawing class details
        classInfoElement.parentElement.classList.add('gap-10') // add spacing between details and skill options
        classInfoElement.innerHTML = '<h1>Details</h1><hr class="border-slate-900">'
        classInfoElement.classList.add('p-4') // add some padding
        classSkillElement.innerHTML = '<h1>Skill Options</h1><hr class="border-slate-900">'
        classSkillElement.classList.add('p-4') // add some padding

        classInfoElement.innerHTML += 'Hit Die: ' + classInfo.hitdie + '<br>'
        classInfoElement.innerHTML += 'Skill Choices: ' + classInfo.skillsChoice + '<br><br>'

        // class skills
        for (let i = 0; i < classInfo.skills.length; i++) {
            let classSkills = classInfo.skills[i]
            classSkillElement.innerHTML += classSkills.item.name.slice(7) + '<br>'
            console.log(classSkills.item.name)
        }

        // class proficiencies
        for (let i = 0; i < classInfo.proficiencies.length; i++) {
            let classProficiencies = classInfo.proficiencies[i]
            if (!classProficiencies.name.match("Saving")) { // skip the saving throws, these are displayed later
                classInfoElement.innerHTML += 'Proficiency: ' + classProficiencies.name + '<br>'
                console.log('Proficiencies: ' + classProficiencies.name)
            }
        }
        classInfoElement.innerHTML += '<br>'

        // class saving throws
        for (let i = 0; i < classInfo.savingthrows.length; i++) {
            let classSavingThrows = classInfo.savingthrows[i]
            classInfoElement.innerHTML += 'Saving Throw: ' + classSavingThrows.name + '<br>'
            console.log('Saving Throws: ' + classSavingThrows.name)
        }
        classInfoElement.innerHTML += '<br>'

        // class equipment
        for (let i = 0; i < classInfo.equipment.length; i++) {
            let classEquipment = classInfo.equipment[i]
            classInfoElement.innerHTML += 'Starting Equipment: ' + classEquipment.equipment.name + '<br>'
            console.log('Starting Equipment: ' + classEquipment.equipment.name)
        }
    })
}

function getStats() {
    if (classSelectElement.value == 'select') { 
        statInfoElement.innerHTML = 'You have to select a class!'
        return 
    }

    // roll for all stats
    let statsObject = {
        str: rollStat(),
        dex: rollStat(),
        con: rollStat(),
        int: rollStat(),
        wiz: rollStat(),
        cha: rollStat(),
    }
    console.log(statsObject)

    // save statsObject to the global sheet object
    characterSheet.stats = statsObject

    let modifiersObject = {
        str: Math.floor((statsObject.str - 10) / 2),
        dex: Math.floor((statsObject.dex - 10) / 2),
        con: Math.floor((statsObject.con - 10) / 2),
        int: Math.floor((statsObject.int - 10) / 2),
        wiz: Math.floor((statsObject.wiz - 10) / 2),
        cha: Math.floor((statsObject.cha - 10) / 2),
    }
    console.log(modifiersObject)

    characterSheet.modifiers = modifiersObject

    let armorClass = modifiersObject.dex + 10
    console.log('AC: ' + armorClass)
    
    let hitPoints = characterSheet.classInfo.hitdie + modifiersObject.con
    console.log(typeof characterSheet.classInfo.hitdie)
    console.log('HP: ' + hitPoints)

    characterSheet.hitpoints = hitPoints

    let drawStats = () => {
        statInfoElement.innerHTML = 
        `
        <ul class="p-2">
            <li>Stats</li>
            <hr class="border-slate-900">
            <li>Strength: ${statsObject.str}</li>
            <li>Dexterity: ${statsObject.dex}</li>
            <li>Constitution: ${statsObject.con}</li>
            <li>Intelligence: ${statsObject.int}</li>
            <li>Wisdom: ${statsObject.wiz}</li>
            <li>Charisma: ${statsObject.cha}</li>
        </ul>
        <ul class="p-2">
            <li>Modifiers</li>
            <hr class="border-slate-900">
            <li>Strength: ${modifiersObject.str}</li>
            <li>Dexterity: ${modifiersObject.dex}</li>
            <li>Constitution: ${modifiersObject.con}</li>
            <li>Intelligence: ${modifiersObject.int}</li>
            <li>Wisdom: ${modifiersObject.wiz}</li>
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

}


// Event Listeners
rollDice.addEventListener('click', () => getStats())
raceSelectElement.addEventListener('change', () => raceSearch())
classSelectElement.addEventListener('change', () => classSearch())




// Generic Select Generator
let testArray = ['class', 'class something', 'option 3', 'apple', 'yo']

// TODO: can probably use this on any iterable object, not just arrays

function createOptionList(optionArray) {
    let wrapper = document.createElement('div')
    wrapper.classList.add('select')

    let select = document.createElement('select')

    optionArray.forEach(optionString => {
        let option = document.createElement('option')
        option.innerText = optionString
        select.append(option)
    });

    wrapper.append(select)
    document.body.append(wrapper)
}