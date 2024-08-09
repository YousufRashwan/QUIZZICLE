import React from "react"
import Question from "/src/components/Question.jsx"
import Start from "/src/components/Start.jsx"
import Customize from "/src/components/Customize.jsx"

export default function App() {
    // the tree app states are (start => customize => quiz)
    const [appState, setAppState] = React.useState("start")

    // the score of correct chosen answer
    const [score, setScore] = React.useState(0)

    // formData is the questions data from the api (modified)
    const [formData, setFormData] = React.useState([])

    // to set loading screen while fetching the api
    const [loading, setLoading] = React.useState(false)

    // the quiz state has to substates which are (submitted) & (not submitted)
    // submitted => (submit === true) | not submitted => (submit === false)
    const [submit, setSubmit] = React.useState(false)
    
    const [apiLink, setApiLink] = React.useState(
        `https://opentdb.com/api.php?amount=5`
    )
    
    React.useEffect(() => {
        if (!submit && appState === "quiz") {
            getApiFormData()
        }
    }, [submit, appState])

    React.useEffect(() => {
        if(loading) setLoading(false)
    }, [formData])

    function getApiFormData() {
        setLoading(true)
        fetch(apiLink)
            .then(res => res.json())
            .then(data => setFormData(data.results.map(result => ({
                category: result.category,
                question: result.question,
                answers: randomizeAnswers(result.incorrect_answers,
                result.correct_answer),
                correctAnswer: result.correct_answer,
                id: result.question,
                chosenAnswer: ""
            }))
        ))
        
    }
    
    function randomizeAnswers(incorrectAnswers, correctAnswer) {
        const answers = [...incorrectAnswers, correctAnswer]
        const n = answers.length
        const randIndex = Math.floor(Math.random() * n);
        [answers[randIndex], answers[n - 1]] = 
        [answers[n - 1], answers[randIndex]]
        return answers
    }
    

    function handleQuizPref(event, quizPref) {
        event.preventDefault()
        const {amount, category, difficulty, type} = quizPref
        setApiLink(
            `https://opentdb.com/api.php?
            ${`amount=${amount}&`}
            ${category ? `category=${category}&` : ""}
            ${difficulty ? `difficulty=${difficulty}&` : ""}
            ${type ? `type=${type}` : ""}`
        )
        // when first time setting quizPref the submit state will be false
        // but next times will be true so we have to get it back to false
        if (submit !== false) setSubmit(false)
        setAppState("quiz")
    }
    
    function handleAnswerChoice(asnwerEvent, questionId) {
        if (!submit) {
            const {value} = asnwerEvent.target
            setFormData(oldFormData => 
            oldFormData.map(questionData => 
            questionData.id === questionId 
            ? ({...questionData, chosenAnswer: value}) 
            : questionData))
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        if (!submit) {
            let correctAnswersCount = 0;
            formData.map(questionData => {
                if (questionData.chosenAnswer ===
                questionData.correctAnswer) {
                    correctAnswersCount++
                }
            })
            setScore(correctAnswersCount)
        } else {
            setScore(0)
            // this happends in case user clicked (play again)
            // we set the state to quiz 
            //setAppState("quiz")
        }
        setSubmit(!submit)
    }

    const questionElems = formData.map(questionData => 
    <Question 
    key={questionData.id}
    {...questionData}
    handleAnswerChoice={handleAnswerChoice}
    submitted={submit}
    />)
    
    return (
        <>
            
            {
                loading
                ?
                <h1>Loading...</h1>
                :
                (appState === "start")
                ?
                <Start handleStart={() => setAppState("customize")}/>
                :
                (appState === "customize")
                ?
                <Customize handleQuizPref={handleQuizPref} />
                :
                <form onSubmit={handleSubmit} className="questions-container">
                    {questionElems}
                    <div className="bottom-bar">
                        { submit && 
                        <>
                            <div className="score">
                                You scored {`${score}/${questionElems.length}`} correct answers
                            </div>
                            <button onClick={() => setAppState("customize")}>
                                New Game 
                            </button>
                        </>
                        }
                        <button /* Default Form Submit Button */>
                            {!submit ? "Check answers" : "Play again"}
                        </button>
                    </div>
                </form>
            }
        </>
    )
}