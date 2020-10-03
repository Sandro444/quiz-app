export const initialState = {
    token: null,
    categories: [],
    questions: [],
    currentCategory: {
        id: 404,
        name: null
    },
    difficulty: "Any Difficulty",
    numOfQuestions: 10,
    type: "Any Type",
    score: 0,
    questionCount: 0,
    quizStarted: false
}

export const quizReducer = (state, action) => {
    switch(action.type){
        case 'set-token':
            return {...state,
            token: action.payload}
        case 'set-categories':
            return {...state,
            categories: action.payload}
        case 'set-questions':
            return {...state,
            questions: action.payload}
        case 'set-current-category':
            return {...state,
            currentCategory: action.payload}
        case 'set-difficulty':
            return {...state,
            difficulty: action.payload}
        case 'set-number-of-questions':
            return {...state,
            numOfQuestions: action.payload}
        case 'set-type':
            return {...state,
            type: action.payload}
        case 'set-questions-count':
            return {...state,
            questionCount: action.payload}
        case 'set-score':
            return {...state,
            score: action.payload}
        case 'set-quiz-started':
            return {...state,
            score:0,
            quizStarted: action.payload}
        default:
            return state
    }
}

