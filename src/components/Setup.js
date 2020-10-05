import React, {useEffect, useContext} from "react"
import QuizContext from "../context"

const Setup = ({fetchQuestions}) => {
    const {state, dispatch} = useContext(QuizContext)

    useEffect(() => {

        dispatch({type: "set-current-category", payload: state.categories[0]})
        // eslint-disable-next-line
    }, [])

    const selectCategory = (e) => {

        let current = state.categories.find(category => category.id === Number(e.target.value) )

        dispatch({type: "set-current-category", payload: current})

    }

    const drawCategories = () => {

        return state.categories ? state.categories.map((category) => {
            return(
                <option value = {category.id} key={category.id?category.id:404}> {category.name} </option>
            )
        }) : ""

    }

    const selectDifficulty = (e) => {

        let difficulty = ["Any Difficulty", "Easy", "Medium", "Hard"].find(diff => diff === e.target.value)
        dispatch({type: "set-difficulty", payload: difficulty})

    }

    const drawDifficulties = () => {

        return ["Any Difficulty", "Easy", "Medium", "Hard"].map(diff => <option key={diff} value={diff}> {diff} </option>)
    
    }

    const selectQuestionAmount = (e) => {

        return e.target.value <= 50 ? dispatch({type:"set-number-of-questions", payload: e.target.value}) : null
    
    }

    const selectType = (e) => {

        dispatch({type: "set-type", payload: e.target.value})

    }

    const drawTypes = () => {

        let allTypes = ["Any Type", "Multiple Choice", "True/False"]
        return(
            allTypes.map(type => <option key={type} value={type}> {type} </option>)
        )

    }

    const startQuiz = () => {

        let category = state.currentCategory.id;
        let amount = Number(state.numOfQuestions)
        let difficulty = state.difficulty.toLowerCase()
        let type = state.type === "Any Type"? undefined : state.type === "Multiple Choice"? "multiple" : "boolean"
        
        fetchQuestions(amount, category, difficulty, type, state.token)

    }

    return(
        
        <div className="quiz-board">
            <h4> Select Category </h4>
            <select className="category-dropdown" onClick={selectCategory}>
                {drawCategories()}
            </select>

            <h4> Select Difficulty </h4>
            <select className="difficulty-dropdown" onClick={selectDifficulty}>
                {drawDifficulties()}
            </select>
            
            <h4> Select Number of Questions </h4>
            <input type="number" value={state.numOfQuestions} onChange={selectQuestionAmount} max="50" step="5"></input> <i>(max: 50)</i>
            
            <h4> Select Questions' Type </h4>
            <select className="type-dropdown" onClick={selectType}>
                {drawTypes()}
            </select>

            <h4> Ready? </h4>
            <button onClick={startQuiz}>Start</button>
        </div>
    )
}

export default Setup
