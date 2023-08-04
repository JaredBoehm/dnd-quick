
// TODO: Function that saves this to Local Storage

let characterSheets = [] // Saves this to Local Storage, the last characterSheet object in the array will be the last creation session (to save creation progress) 

// Character sheet object, push to characterSheets[] to save progress

let characterSheet = {
    name: '', // update on input change
    race: '', // raceSelector.value
    raceInfo: {}, // api call
    class: '', // classSelector.value
    classInfo: {}, // api call
    stats: {},
    modifiers: {},  
    bonuses: [],
}

//Variables

var raceSelector = document.querySelector("#race")
var raceSearchButton = document.querySelector("#race-search-button")
var classSelector = document.querySelector("#class")
var classSearchButton = document.querySelector("#class-search-button")
var rollDice = document.querySelector("#rolldice")
var characterRace = document.getElementById("characterRace")
var characterClass = document.getElementById("characterClass")

// Functions

function raceSearch() {
    fetch(
        "https://www.dnd5eapi.co/api/races/" + raceSelector.value
    ).then(function (response) {
        return response.json()
    }).then(function (data) {
        console.log(data)
        var raceInfo = {
            name: data.name,
            bonus: data.ability_bonuses,
            speed: data.speed,
            languages: data.languages,
            proficiencies: data.starting_proficiencies,
            traits: data.traits,
        }
        characterSheet.raceInfo = raceInfo
        console.log(raceInfo)
        console.log("Name: " + raceInfo.name)
        console.log("Speed: " + raceInfo.speed)


        for (var i = 0; i < raceInfo.bonus.length; i++) {

            let bonusName = raceInfo.bonus[i].ability_score.name
            let bonusAmt = raceInfo.bonus[i].bonus
            
            var bonusInfo = ("Bonus To: " + bonusName + " of " + bonusAmt)
            console.log(bonusInfo)

            characterSheet.bonuses.push( { bonusName, bonusAmt } ) 
    
        }

        for (var i = 0; i < raceInfo.proficiencies.length; i++) {
            var proficiencies = raceInfo.proficiencies[i]
            console.log("Proficiencies: " + proficiencies.name)
        }

        for (var i = 0; i < raceInfo.languages.length; i++) {
            var languages = raceInfo.languages[i]
            console.log("Languages: " + languages.name)
        }

        for (var i = 0; i < raceInfo.traits.length; i++) {
            var traits = raceInfo.traits[i]
            console.log("Traits: " + traits.name)
        }
    })
}

function classSearch() {
    fetch(
        "https://www.dnd5eapi.co/api/classes/" + classSelector.value
    ).then(function (response) {
        return response.json()
    }).then(function (data) {
        // console.log(data)
        var classInfo = {
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
        localStorage.setItem("hitdie", JSON.stringify(classInfo.hitdie))
        console.log("Name: " + classInfo.name)
        console.log("Hit Die: " + classInfo.hitdie)
        console.log("Choose Skills: " + classInfo.skillsChoice)
        for (var i = 0; i < classInfo.skills.length; i++) {
            var classSkills = classInfo.skills[i]
            console.log(classSkills.item.name)
        }
        for (var i = 0; i < classInfo.proficiencies.length; i++) {
            var classProficiencies = classInfo.proficiencies[i]
            console.log("Proficiencies: " + classProficiencies.name)
        }
        for (var i = 0; i < classInfo.savingthrows.length; i++) {
            var classSavingThrows = classInfo.savingthrows[i]
            console.log("Saving Throws: " + classSavingThrows.name)
        }
        for (var i = 0; i < classInfo.equipment.length; i++) {
            var classEquipment = classInfo.equipment[i]
            console.log("Starting Equipment: " + classEquipment.equipment.name)
        }
    })
}

function getStats() {

    var statsObject = {
        str: rollStat(),
        dex: rollStat(),
        con: rollStat(),
        int: rollStat(),
        wiz: rollStat(),
        cha: rollStat(),
    }
    console.log(statsObject)

    characterSheet.stats = statsArray

    var modifiersObject = {
        str: Math.floor((statsObject.str - 10) / 2),
        dex: Math.floor((statsObject.dex - 10) / 2),
        con: Math.floor((statsObject.con - 10) / 2),
        int: Math.floor((statsObject.int - 10) / 2),
        wiz: Math.floor((statsObject.wiz - 10) / 2),
        cha: Math.floor((statsObject.cha - 10) / 2),
    }
    console.log(modifiersObject)

    characterSheet.modifiers = modifiersObject

    var armorClass = modifiersObject.dex + 10
    console.log("AC: " + armorClass)
    
    var hitPoints = characterSheet.classInfo.hitPoints + modifiersObject.con
    console.log("HP: " + hitPoints)
}

// Event Listeners

rollDice.addEventListener("click", () => getStats())
raceSearchButton.addEventListener("click", () => raceSearch())
classSearchButton.addEventListener("click", () => classSearch())
raceSearchButton.addEventListener("click", raceSearchEl)
classSearchButton.addEventListener("click", classSearchEl)

// Class and Race Search Event Functions

function raceSearchEl(event) {
    console.log(event)
    characterRace.classList.remove("hide")
}

function classSearchEl(event) {
    console.log(event)
    characterClass.classList.remove("hide")
}

// // Generic Select Generator

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