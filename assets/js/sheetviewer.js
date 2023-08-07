let url = window.location.search
let params = new URLSearchParams(url)
let sheetIndex = params.get('sheet')

let sheets = JSON.parse(localStorage.getItem('characterSheets'))
let sheet = sheets[sheetIndex]

console.log(sheet)

let proficiencyBonus = 2

let skillOrder = [{ name: 'Acrobatics', stat: 'dex' }, { name: 'Animal Handling', stat: 'wis' }, { name: 'Arcana', stat: 'int' }, { name: 'Athletics', stat: 'str' }, { name: 'Deception', stat: 'cha' }, { name: 'History', stat: 'int' }, { name: 'Insight', stat: 'wis' }, { name: 'Intimidation', stat: 'cha' }, { name: 'Investigation', stat: 'int' }, { name: 'Medicine', stat: 'wis' }, { name: 'Nature', stat: 'int' }, { name: 'Perception', stat: 'wis' }, { name: 'Performance', stat: 'cha' }, { name: 'Persuasion', stat: 'cha' }, { name: 'Religion', stat: 'int' }, { name: 'Sleight of Hand', stat: 'dex' }, { name: 'Stealth', stat: 'dex' }, { name: 'Survival', stat: 'wis' },]

// sheet.savingThrows.index

function getHasSavingThrowBonus(stat) {
    let result = sheet.modifiers[stat]
    sheet.classInfo.savingthrows.forEach(savingThrow => {
        if (savingThrow.index === stat) {
            result = `<span class="absolute right-[42px] top-[-19px] text-7xl">●</span>${sheet.modifiers[stat] + proficiencyBonus}`
        } 
    });
    return result
}

function drawLanguages() {
    let top = 1735
    let result = ''
    sheet.raceInfo.languages.forEach(language => {
        result += `<div class="absolute top-[${top}px] left-[90px] w-[475px] text-center text-2xl">Language: ${language.name}</div>`
        top += 30
    })
    return result
}

function drawSkills() {
    let top = 885
    let result = ''
    skillOrder.forEach(skill => {
        if (sheet.skills.includes(skill.name)) {
            result += `<div class="absolute top-[${top}px] left-[305px] w-[50px] text-center text-3xl">+<span class="absolute right-[42px] top-[-25px] text-7xl">●</span>${sheet.modifiers[skill.stat] + proficiencyBonus}</div>`
        } else {
            result += `<div class="absolute top-[${top}px] left-[305px] w-[50px] text-center text-3xl">+${sheet.modifiers[skill.stat]}</div>`
        }
        top += 38
    })
    return result
}

function drawTraits() {
    let top = 1065
    let result = ''
    sheet.raceInfo.traits.forEach(trait => {
        result += `<div class="absolute top-[${top}px] left-[1130px] w-[490px] text-center text-2xl">Trait: ${trait.name}</div>`
        top += 30
    })
    return result
}

function drawEquipment() {
    let top = 1645
    let result = ''
    sheet.classInfo.equipment.forEach(item => {
        result += `<div class="absolute top-[${top}px] left-[650px] w-[490px] text-center text-2xl">${item.equipment.name}</div>`
        top += 30
    })
    return result
}


document.body.innerHTML = 
`
<section>

    <!-- Character Sheet Image -->
    <img class="w-[1700px] h-[2200px]" src="../assets/img/charactersheet.png" alt="Printable Sheet">

    <!-- Character Name -->
    <div class="absolute top-[180px] left-[125px] w-[600px] text-center text-4xl">${sheet.name}</div>

    <!-- Player Class -->
    <div class="absolute top-[145px] left-[750px] w-[300px] text-center text-2xl">${sheet.class}</div>

    <!-- Player Race -->
    <div class="absolute top-[220px] left-[750px] w-[300px] text-center text-2xl">${sheet.race}</div>

    <!-- Proficiency Bonus -->
    <div class="absolute top-[470px] left-[255px] w-[85px] text-center text-5xl">+${proficiencyBonus}</div>

    <!-- Armor Class -->
    <div class="absolute top-[400px] left-[620px] w-[125px] text-center text-6xl">${sheet.armorClass}</div>

    <!-- Speed -->
    <div class="absolute top-[410px] left-[935px] w-[140px] text-center text-6xl">${sheet.raceInfo.speed}</div>

    <!-- Hit Points -->
    <div class="absolute top-[540px] left-[800px] w-[250px] text-center text-4xl">${sheet.hitpoints}</div>

    <!-- Hit Dice -->
    <div class="absolute top-[880px] left-[630px] w-[200px] text-center text-3xl">${sheet.classInfo.hitdie}</div>

    <!-- STR -->
    <div class="absolute top-[435px] left-[90px] w-[133px] text-center text-6xl">${sheet.stats.str}</div>
    <div class="absolute top-[515px] left-[90px] w-[133px] text-center text-4xl">${sheet.modifiers.str}</div>
    <div class="absolute top-[565px] left-[305px] w-[50px] text-center text-3xl">+${getHasSavingThrowBonus('str')}</div>

    <!-- DEX -->
    <div class="absolute top-[635px] left-[90px] w-[133px] text-center text-6xl">${sheet.stats.dex}</div>
    <div class="absolute top-[715px] left-[90px] w-[133px] text-center text-4xl">${sheet.modifiers.dex}</div>
    <div class="absolute top-[600px] left-[305px] w-[50px] text-center text-3xl">+${getHasSavingThrowBonus('dex')}</div>

    <!-- CON -->
    <div class="absolute top-[835px] left-[90px] w-[133px] text-center text-6xl">${sheet.stats.con}</div>
    <div class="absolute top-[915px] left-[90px] w-[133px] text-center text-4xl">${sheet.modifiers.con}</div>
    <div class="absolute top-[636px] left-[305px] w-[50px] text-center text-3xl">+${getHasSavingThrowBonus('con')}</div>

    <!-- INT -->
    <div class="absolute top-[1035px] left-[90px] w-[133px] text-center text-6xl">${sheet.stats.int}</div>
    <div class="absolute top-[1115px] left-[90px] w-[133px] text-center text-4xl">${sheet.modifiers.int}</div>
    <div class="absolute top-[675px] left-[305px] w-[50px] text-center text-3xl">+${getHasSavingThrowBonus('int')}</div>

    <!-- WIS -->
    <div class="absolute top-[1230px] left-[90px] w-[133px] text-center text-6xl">${sheet.stats.wis}</div>
    <div class="absolute top-[1312px] left-[90px] w-[133px] text-center text-4xl">${sheet.modifiers.wis}</div>
    <div class="absolute top-[712px] left-[305px] w-[50px] text-center text-3xl">+${getHasSavingThrowBonus('wis')}</div>

    <!-- CHA -->
    <div class="absolute top-[1430px] left-[90px] w-[133px] text-center text-6xl">${sheet.stats.cha}</div>
    <div class="absolute top-[1510px] left-[90px] w-[133px] text-center text-4xl">${sheet.modifiers.cha}</div>
    <div class="absolute top-[750px] left-[305px] w-[50px] text-center text-3xl">+${getHasSavingThrowBonus('cha')}</div>

    <!-- Skills -->
    ${drawSkills()}

    <!-- Proficiencies and Languages -->
    ${drawLanguages()}

    <!-- Traits -->
    ${drawTraits()}

    <!-- Equipment -->
    ${drawEquipment()}
    
</section>
`


print()