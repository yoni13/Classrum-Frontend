import React, { useState } from 'react';
import './App.css';

function App() {
    const [homeworks, setHomeworks] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const addHomework = () => {
        if (inputValue.trim() !== "") {
            fetch('https://nw-classrum-api.nicewhite.xyz/subject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'text': inputValue,
                }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    const newHomework = {
                        title: inputValue,
                        nextClassTime: data.nextclasstime,
                    };
                    setHomeworks([...homeworks, newHomework]);
                    setInputValue(''); // Clear input after adding
                })
                .catch(error => {
                    console.error("Fetch error:", error);
                    alert("Failed to add homework. Please try again later."); // User-friendly error message
                });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        addHomework();
    };

    return (
        <>
            <h1 id="homeworkTitle">Homeworks | Expermient </h1>
            <div id="homeworkInputArea">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="homeworkInput"
                        placeholder="Add new homework..."
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    &nbsp;&nbsp;
                    <button id="addHomeworkBtn" type="submit">Add</button>
                </form>
            </div>
            <div id="homeworkList">
                {homeworks.map((homeworkItem, index) => (
                    <React.Fragment key={index}>
                        <div className="homeworkItem">
                            <h1 className="homeworkTitleName">{homeworkItem.title}</h1>
                            <div className="homeworkNextTimeDateBG">{homeworkItem.nextClassTime}</div>
                        </div>
                        <br />
                    </React.Fragment>
                ))}
            </div>
        </>
    );
}

export default App;