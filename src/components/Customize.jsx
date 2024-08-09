import React from "react"

export default function Customize(props) {
    const [quizPref, setQuizPref] = React.useState({
        amount: 5,
        category: 0,
        difficulty: "",
        type: ""
    })

    function handleChange(event) {
        const {name, value, type, min, max} = event.target
        setQuizPref(prevInfoForm => ({
            ...prevInfoForm,
            [name]: type === "number" 
            ? Math.max(Number(min), Math.min(Number(max), Number(value))) 
            : value
        }))
    }

    return (
    <form className="Customize">

        <label htmlFor="amount">Number of Questions <i>(1-50)</i> :</label>
        <input
        type="number"
        id="amount"
        name="amount"
        className="amount-input"
        min="1" max="50"
        value={quizPref.amount}
        onChange={handleChange}
        />
        <br />

        <label htmlFor="category">Select Category:</label>
        <select name="category" id="category"
        value={quizPref.category} onChange={handleChange}>
            <option value={0}>Any Category</option>
            <option value={9}>General Knowledge</option>
            <option value={10}>Entertainment: Books</option>
            <option value={11}>Entertainment: Film</option>
            <option value={12}>Entertainment: Music</option>
            <option value={13}>Entertainment: Musicals & Theaters</option>
            <option value={14}>Entertainment: Televison</option>
            <option value={15}>Video Games</option>
            <option value={16}>Board Games</option>
            <option value={17}>Science & Nature</option>
            <option value={18}>Science: Computers</option>
            <option value={19}>Science: Mathematics</option>
            <option value={20}>Mythology</option>
            <option value={21}>Sports</option>
            <option value={22}>Geography</option>
            <option value={23}>History</option>
            <option value={24}>Politics</option>
            <option value={25}>Art</option>
            <option value={26}>Celebrities</option>
            <option value={27}>Animals</option>
            <option value={28}>Vehicles</option>
            <option value={29}>Entertainment: Comics</option>
            <option value={30}>Science: Gadgets</option>
            <option value={31}>Entertainment: Japanese Anime & Manga</option>
            <option value={32}>Entertainment: Cartoon & Animations</option>
        </select>
        <br />

        <label htmlFor="difficulty">Select Difficulty:</label>
        <select name="difficulty" id="difficulty"
        value={quizPref.difficulty} onChange={handleChange}>
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>
        <br />

        <label htmlFor="type">Select Type:</label>
        <select name="type" id="type"
        value={quizPref.type} onChange={handleChange}>
            <option value="">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True/False</option>
        </select>
        <br />

        <button className="start-button"
        onClick={(event) => props.handleQuizPref(event, quizPref)}>
            Start quiz
        </button>
    </form>
    )
}