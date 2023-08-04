
async function getRandomNames() {
    try {
        let response = await fetch('https://api.fungenerators.com/name/generate.json?category=shakespearean&limit=10')
        let names = await response.json()
        if (!response.ok) {
            throw Error(response.statusText)
        }
        return names
    } catch (error) {
        console.log(error)
        return backupNames
    }
}

// Needs to be implemented

async function writeToDom() {
    let names = await getRandomNames()
    console.log(names)
}
writeToDom()