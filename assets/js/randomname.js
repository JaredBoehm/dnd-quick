let characterName = document.querySelector('#character-name')
let randomName = document.querySelector('#random-name')
let randomNamesArray = backupNamesArray

async function getRandomNames() {
    try {
        let response = await fetch('https://api.fungenerators.com/name/generate.json?category=shakespearean&limit=10')
        let names = await response.json()
        if (!response.ok) {
            throw Error(response.statusText)
        }
        names.contents.names.forEach(name => {
            randomNamesArray.push(name)
        });
    } catch (error) {
        console.log(error)
    }
}
getRandomNames()

randomName.addEventListener('click', () => {
    let randomIndex = Math.floor(Math.random() * randomNamesArray.length)
    characterName.value = randomNamesArray[randomIndex]
})