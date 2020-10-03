import React, {useEffect, useReducer} from 'react';
import services from "./services"
import Setup from "./components/Setup"
import Question from "./components/Question"
import { quizReducer, initialState } from "./reducer";
import QuizContext from "./context"


function App() {
  const [state, dispatch] = useReducer(quizReducer, initialState)

  useEffect(() => {

    services.retrieveToken()
    .then(response => {
      if(response.response_code === 0){

        dispatch({type: "set-token", payload: response.token})

      }
    })
    
  }, [])


  useEffect(() => {

    services.retrieveCategories()
    .then(response => {

      response.trivia_categories.unshift({id: 404, name: "Any Category"})
      dispatch({type: "set-categories", payload: response.trivia_categories})

    })

  }, [])

  const fetchQuestions = (amount,category,difficulty,type, token) => {
    services.startQuiz(amount, category, difficulty, type, token)
      .then(response => {

          if(response.response_code === 0){

            dispatch({type: "set-questions", payload: response.results})
            dispatch({type:"set-quiz-started", payload: true })

          } else if(response.response_code === 4 || response.response_code === 1){

            window.alert("No questions found with current parameters")
            /*რესპონს კოდი 4 სხვა რაღაცა როა ვიცი, მაგრამ რესპონს კოდი 1 არასდროს დაუბრუნებია აპის და მაგიტომ გავაერთიანე*/ 
          
          }
          
      }) 
}

const restartQuiz = () => {

  dispatch({type: "set-quiz-started", payload: false});
  dispatch({type: "set-categories", payload: [] });
  dispatch({type: "set-questions", payload: [] });
  
  services.retrieveCategories()
  .then(response => {

    response.trivia_categories.unshift({id: 404, name: "Any Category"})
    dispatch({type: "set-categories", payload: response.trivia_categories})

  })
}

  return (
    <QuizContext.Provider value={{state, dispatch}}>
    <div className="App">

      {state.categories.length === 0 ? <div className="spin-wrapper"><i className="spinner"></i>loading...</div> : state.questions.length === 0 && state.quizStarted === false? <Setup fetchQuestions={fetchQuestions} /> : <Question restartQuiz={restartQuiz} />}
      
    </div>
    <p style={{textAlign:"center",color:"white"}}>by Sandro Tsereteli</p>
    </QuizContext.Provider>
  );
}

export default App;
