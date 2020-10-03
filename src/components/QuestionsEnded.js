import React, { useContext } from "react";

import QuizContext from "../context";

export const QuestionsEnded = ({restartQuiz}) => {
    const { state } = useContext(QuizContext);

    const returnFinalScore =  () => {
        return `${state.score}/${state.questionCount}`
    }

    const returnFinalPercent = () => {
        return `${(Math.round((state.score / state.questionCount + Number.EPSILON) *100) /100) * 100}%`
    }

    return (
        <div>
            <h4>Quiz Ended</h4>
            <h4>Your Score: {returnFinalScore()}</h4>
            <h4>Percentage: {returnFinalPercent()}</h4>
            <button onClick={() => restartQuiz()}> restart </button>
        </div>
    );
};
