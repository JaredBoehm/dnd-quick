
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function rollStat() {
    return generateRandomNumber(10, 18) // currently preferred
}

// function rollDice(min, max, amount) { 
//     let diceArray = []
//     for (i = 0; i < amount; i++) {
//         diceArray.push(generateRandomNumber(min, max))
//     }
//     return diceArray.sort((a, b) => a - b)
// } 

// function rollStat() {
//     let diceArray = rollDice(1, 6, 4)
//     diceArray.shift()
//     let sum = diceArray.reduce((total, num) => {
//         return total + num
//     })
//     return sum
// }

