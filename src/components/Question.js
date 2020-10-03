import React, { useEffect, useContext } from "react";
import QuizContext from "../context";

import decode from "../helper_functions/decode";
import shuffleAnswers from "../helper_functions/shuffleAnswers";

import { QuestionsEnded } from "./QuestionsEnded";
const Question = ({restartQuiz}) => {
    const { state, dispatch } = useContext(QuizContext);

    useEffect(
        () =>
            dispatch({
                type: "set-questions-count",
                payload: state.questions.length,
            }),
            // eslint-disable-next-line
        []
    );

    const drawAnswers = () => {
        let currentQuestion = state.questions[0];
        let allAnswers = currentQuestion.incorrect_answers.concat(
            currentQuestion.correct_answer
        );

        if (currentQuestion.type === "multiple") {
            allAnswers = shuffleAnswers(allAnswers);
        } else {
            let firstItem = allAnswers.shift();
            if (firstItem === "True") allAnswers.unshift(firstItem);
            else allAnswers.push(firstItem);
        }

        return allAnswers.map((answer, i) => {
            return (
                <div key={i} style={{ marginBottom: "5px" }}>
                    <span style={{ display: "inline-block", width: "20px" }}>
                        {["a.", "b.", "c.", "d."][i]}
                    </span>
                    <button
                        style={{ display: "inline-block", textJustify: "" }}
                        onClick={checkAnswer}
                        value={answer}
                        key={i}
                    >
                        {decode(answer)}
                    </button>
                </div>
            );
        });
    };

    const checkAnswer = (e) => {
        if (e.target.value === state.questions[0].correct_answer) {
            dispatch({ type: "set-score", payload: state.score + 1 });

            let allQuestions = [...state.questions];
            allQuestions.shift();

            dispatch({ type: "set-questions", payload: allQuestions });
        } else {
            let allQuestions = [...state.questions];

            allQuestions.shift();
            
            dispatch({ type: "set-questions", payload: allQuestions });
        }
    };

    const drawQuestion = () => {
        return state.questions.length > 0 ? (
            <div className="single-question">
                <h4>
                    Question {state.questionCount - state.questions.length + 1}/
                    {state.questionCount}
                </h4>
                <p> {decode(state.questions[0].question)} </p>

                {drawAnswers()}
            </div>
        ) : <QuestionsEnded restartQuiz={restartQuiz} />
    };

    return <div className="question">{drawQuestion()}</div>;
};

export default Question;
