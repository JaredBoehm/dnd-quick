var raceSelector = document.querySelector("#race")
var raceSearchButton = document.querySelector("#race-search-button")

var classSelector = document.querySelector("#class")
var classSearchButton = document.querySelector("#class-search-button")

function raceSearch() {
    fetch (
        "https://www.dnd5eapi.co/api/races/" + raceSelector.value
        ) .then(function(response){
            return response.json()
        }) .then(function(data){
            console.log(data)
        })
}

function classSearch(){
    fetch (
        "https://www.dnd5eapi.co/api/classes/" + classSelector.value
    ) .then(function(response){
        return response.json()
    }).then(function(data){
        var classInfo = {
            name: data.name,
            hitdie: data.hit_die,
            skills: data.proficiency_choices[0].desc,
            proficiencies: data.proficiencies,
            savingthrows: data.saving_throws,            
        }
        console.log(classInfo.name)
        console.log(classInfo.hitdie)
        console.log(classInfo.skills)
        for (var i = 0; i < classInfo.proficiencies.length; i++) {
            var classProficiencies = classInfo.proficiencies[i]
            console.log(classProficiencies.name)
        }
        for (var i = 0; i < classInfo.savingthrows.length; i++) {
            var classSavingThrows = classInfo.savingthrows[i]
            console.log(classSavingThrows.name)
        }
    })
}

raceSearchButton.addEventListener("click", () => raceSearch())
classSearchButton.addEventListener("click", () => classSearch())