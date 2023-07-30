var barbarianCard = document.querySelector(".barbarian-card")

function barbarianSearch(){
    fetch (
        "https://www.dnd5eapi.co/api/classes/barbarian"
    ) .then(function(response){
        return response.json()
    }).then(function(data){
        var barbarianInfo = {
            name: data.name,
            hitdie: data.hit_die,
            skills: data.proficiency_choices[0].desc,
            proficiencies: data.proficiencies,
            savingthrows: data.saving_throws,            
        }
        console.log(barbarianInfo.name)
        console.log(barbarianInfo.hitdie)
        console.log(barbarianInfo.skills)
        for (var i = 0; i < barbarianInfo.proficiencies.length; i++) {
            var barbarianProficiencies = barbarianInfo.proficiencies[i]
            console.log(barbarianProficiencies.name)
        }
        for (var i = 0; i < barbarianInfo.savingthrows.length; i++) {
            var barbarianSavingThrows = barbarianInfo.savingthrows[i]
            console.log(barbarianSavingThrows.name)
        }
        // barbarianCard.innerHTML=barbarianInfo.name
    })
}
barbarianSearch()