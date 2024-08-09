import React from "react"

export default function Start(props) {
    return (
        <div className="Start">
            <h1>Quizzical</h1>
            <br />
            <p>Challenge yourself and test your knowledge</p>
            <br />
            <button onClick={props.handleStart}>
                Customize Your Own Quiz
            </button>
        </div>
    )
}