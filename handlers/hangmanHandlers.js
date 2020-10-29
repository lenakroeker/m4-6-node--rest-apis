const { words } = require('../data/words');

// write your handlers here...

const getWordById = (req, res) => {
    const id = req.params.id;
    let wordObj = "";
    words.map((obj) => { if (obj.id == id) { wordObj = obj } })

    if (wordObj != "") {
        res.status(200).json({
            status: 200,
            data: wordObj
        })
    }
    else {
        res.status(400).json({ status: 400, data: "word not found" })
    }
}

const getIdLetterCount = (req, res) => {
    const wordObj = words[Math.floor(Math.random() * words.length)]
    const randWordObj = {};
    randWordObj.id = wordObj.id;
    randWordObj.letterCount = wordObj.letterCount;
    if (randWordObj != {}) {
        res.status(200).json({
            status: 200,
            data: randWordObj
        })
    } else {
        res.status(400).json({ status: 400, data: "word not found" })
    }

}

const handleLetterGuess = (req, res) => {
    const id = req.params.id;
    const letterGuess = req.params.letter
    let wordObj = "";
    let returnArr = [];
    words.map((obj) => { if (obj.id == id) { wordObj = obj } })
    let word = wordObj.word;

    for (let i = 0; i < Number(wordObj.letterCount); i++) {
        if (word[i] == letterGuess) {
            returnArr.push(true)
        } else {
            returnArr.push(false)
        }
    }
    if (returnArr.length > 0) {
        res.status(200).json({
            status: 200,
            data: returnArr
        })
    } else {
        res.status(400).json({ status: 400, data: "word not found" })
    }
}

module.exports = { getWordById, getIdLetterCount, handleLetterGuess };