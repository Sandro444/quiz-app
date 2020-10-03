import axios from "axios"

const retrieveToken = () => {
    let request = axios.get("https://opentdb.com/api_token.php?command=request")
    return request.then(response => response.data)
}

const retrieveCategories = () => {
    let request = axios.get("https://opentdb.com/api_category.php")
    return request.then(response => response.data)
}

const startQuiz = (amount, category, difficulty, type, token) => {
    let amountQuery = `amount=${amount}`
    let categoryQuery = category !== 404? `&category=${category}` : ""
    let difficultyQuery = difficulty !== "any difficulty"? `&difficulty=${difficulty}` : ""
    let typeQuery = type? `&type=${type}` : ""
    let request = axios.get(`https://opentdb.com/api.php?${amountQuery}${categoryQuery}${difficultyQuery}${typeQuery}&token=${token}`)
    return request.then(response => response.data)

}

const resetToken = (token) => {
    let request = axios.get(`https://opentdb.com/api_token.php?command=reset&token=${token}`)
    return request.then(response => response.data)
}

export default {
    retrieveToken,
    retrieveCategories,
    startQuiz,
    resetToken
}