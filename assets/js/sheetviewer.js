let url = window.location.search
let params = new URLSearchParams(url)
let sheetIndex = params.get('sheet')

let sheets = JSON.parse(localStorage.getItem('characterSheets'))
let sheet = sheets[sheetIndex]

console.log(sheet)

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

    <!-- DEX -->
    <div class="absolute top-[635px] left-[90px] w-[133px] text-center text-6xl">${sheet.stats.dex}</div>
    <div class="absolute top-[715px] left-[90px] w-[133px] text-center text-4xl">${sheet.modifiers.dex}</div>

    <!-- CON -->
    <div class="absolute top-[835px] left-[90px] w-[133px] text-center text-6xl">${sheet.stats.con}</div>
    <div class="absolute top-[915px] left-[90px] w-[133px] text-center text-4xl">${sheet.modifiers.con}</div>

    <!-- INT -->
    <div class="absolute top-[1035px] left-[90px] w-[133px] text-center text-6xl">${sheet.stats.int}</div>
    <div class="absolute top-[1115px] left-[90px] w-[133px] text-center text-4xl">${sheet.modifiers.int}</div>

    <!-- WIS -->
    <div class="absolute top-[1230px] left-[90px] w-[133px] text-center text-6xl">${sheet.stats.wis}</div>
    <div class="absolute top-[1312px] left-[90px] w-[133px] text-center text-4xl">${sheet.modifiers.wis}</div>

    <!-- CHA -->
    <div class="absolute top-[1430px] left-[90px] w-[133px] text-center text-6xl">${sheet.stats.cha}</div>
    <div class="absolute top-[1510px] left-[90px] w-[133px] text-center text-4xl">${sheet.modifiers.cha}</div>

    <!-- Proficiencies and Languages -->
    <div class="absolute top-[1735px] left-[90px] w-[475px] text-center text-2xl">Language: Common</div>
    <div class="absolute top-[1765px] left-[90px] w-[475px] text-center text-2xl">Proficiency: Battleaxes</div> <!-- each one will be 30px lower -->

    <!-- Traits -->
    <div class="absolute top-[1060px] left-[1130px] w-[490px] text-center text-2xl">16</div>
    <div class="absolute top-[1090px] left-[1130px] w-[490px] text-center text-2xl">16</div> <!-- each one will be 30px lower -->

</section>
`


print()