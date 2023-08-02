var raceSelector = document.querySelector("#race")
var raceSearchButton = document.querySelector("#race-search-button")

var classSelector = document.querySelector("#class")
var classSearchButton = document.querySelector("#class-search-button")

function raceSearch() {
    fetch(
        "https://www.dnd5eapi.co/api/races/" + raceSelector.value
    ).then(function (response) {
        return response.json()
    }).then(function (data) {
        // console.log(data)
        var raceInfo = {
            name: data.name,
            bonus: data.ability_bonuses,
            speed: data.speed,
            languages: data.languages,
            proficiencies: data.starting_proficiencies,
            traits: data.traits,
        }

        console.log("Name: " + raceInfo.name)
        console.log("Speed: " + raceInfo.speed)

        for (var i = 0; i < raceInfo.bonus.length; i++) {
            var bonusArray = raceInfo.bonus[i]
            console.log("Bonus: " + bonusArray.ability_score.name)
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

raceSearchButton.addEventListener("click", () => raceSearch())
classSearchButton.addEventListener("click", () => classSearch())