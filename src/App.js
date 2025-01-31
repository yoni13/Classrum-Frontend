import React, { useState } from 'react';
import './App.css';

function App() {
    const [homeworks, setHomeworks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [currentController, setCurrentController] = useState(null);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        
        // Cancel any ongoing request
        if (currentController) {
            currentController.abort();
        }

        if (event.target.value.trim() !== "") {
            // Create new controller before starting the fetch
            const newController = new AbortController();
            setCurrentController(newController);

            fetch('https://nw-classrum-api.nicewhite.xyz/subject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'text': event.target.value,
                }),
                signal: newController.signal
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    const lastHWData = homeworks.slice(-1)[0];
                    const lastConfirmed = lastHWData ? lastHWData.confirmed : true;

                    if (lastConfirmed === false) {
                        setHomeworks(prev => [
                            ...prev.slice(0, -1),
                            {
                                ...prev[prev.length - 1],
                                title: data.text,
                                nextClassTime: data.nextclasstime
                            }
                        ]);
                    } else {
                        const newHomework = {
                            title: data.text,
                            nextClassTime: data.nextclasstime,
                            confirmed: false
                        };
                        setHomeworks(prev => [...prev, newHomework]);
                    }
                })
                .catch(error => {
                    if (error.name === 'AbortError') {
                        console.log('Fetch aborted');
                        return;
                    }
                    console.error("Fetch error:", error);
                    alert("Failed to add homework. Please try again later.");
                });
        } else {
            setHomeworks(prev => [...prev.slice(0, -1)]);
            setInputValue("");
        }
    };

    const addHomework = () => {
        if (inputValue.trim() !== "") {
            setHomeworks(prev => [
                ...prev.slice(0, -1),
                { ...prev[prev.length - 1], confirmed: true }
            ]);
            setInputValue("");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addHomework();
    };

    return (
        <>
            <h1 id="homeworkTitle">Homeworks | Experiment</h1>
            <p id="homeworkDescription">Press space to delete the last homework</p>
            <div id="homeworkInputArea">
                <form onSubmit={handleSubmit} autoComplete="off">
                    <input
                        type="text"
                        id="homeworkInput"
                        placeholder="Add new homework..."
                        autoFocus
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