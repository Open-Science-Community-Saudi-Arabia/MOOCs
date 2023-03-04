function arrayOfCapitalLetters() {
    return [...Array(26)].map((_, i) => String.fromCharCode(i + 65))
}

module.exports = {
    arrayOfCapitalLetters
}