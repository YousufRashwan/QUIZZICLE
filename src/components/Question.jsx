import React from "react"

export default function Question(props) {
    
    const inputs = props.answers.map(answer => {
        const answerId = `${props.id}${answer}`
        const isChosen = (answer === props.chosenAnswer)
        const isCorrect = (answer === props.correctAnswer)
        const isSubmitted = (props.submitted)
        
        function setBackgroundColor() {
            let backgroundColor = "transparent";
            if (isSubmitted) {
                if (isChosen && !isCorrect) {
                    backgroundColor = "#F8BCBC"
                }
                else if (isCorrect) {
                    backgroundColor = "#94D7A2"
                }
            } else if (isChosen) {
                backgroundColor = "#D6DBF5"
            }
            return backgroundColor
        }

        function setBorder() {
            let borderOpacity = 1
            if (isSubmitted && !isCorrect && !isChosen) {
                borderOpacity = 0.5
            } else if ((isSubmitted && isCorrect) || isChosen) {
                borderOpacity = 0
            }
            return `1px solid rgba(77, 91, 158, ${borderOpacity})`
        }

        return (
        <div key={answerId}>
            <label
            className="asnwer-container"
            style={({
            backgroundColor: setBackgroundColor(),
            border: setBorder(),
            color: `rgba(41, 50, 100, ${isSubmitted && !isCorrect ? 0.5 : 1})`
            })}
            >
                <input 
                type="radio"
                id={answerId}
                name={props.question}
                value={answer}
                checked={isChosen}
                onChange={(event) => props.handleAnswerChoice(event, props.id)}
                />
                <div className="question" dangerouslySetInnerHTML={{ __html: answer }}></div>
            </label>
            <br />
        </div>)
    })

    return (
        <>
            <fieldset>
                <legend className="question" dangerouslySetInnerHTML={{ __html: props.question }}></legend>
                {inputs}
            </fieldset>
            <hr />
        </>
    )
}