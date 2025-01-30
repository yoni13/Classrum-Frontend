import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
    const [homeworks, setHomeworks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const currentFetchController = useRef(null);

    useEffect(() => {
        // Cleanup function for component unmount
        return () => {
            if (currentFetchController.current) {
                currentFetchController.current.abort();
            }
        };
    }, []);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);

        // Cancel the previous fetch request if it exists
        if (currentFetchController.current) {
            currentFetchController.current.abort();
        }

        const controller = new AbortController();
        currentFetchController.current = controller;
        const signal = controller.signal;

        if (event.target.value.trim() !== "") {
            fetch('https://nw-classrum-api.nicewhite.xyz/subject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'text': event.target.value,
                }),
                signal, // Pass the signal to the fetch request
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // get last confirmed or not
                const lastHWData = homeworks.slice(-1)[0];
                // if last HW data is undefined, set lastConfirmed as false
                const lastConfirmed = lastHWData ? lastHWData.confirmed : true;
                if (lastConfirmed === false) {
                    // remove last homework
                    const updatedHomeworks = homeworks.slice(0, -1);
                    const newHomework = {
                        title: event.target.value,
                        nextClassTime: data.nextclasstime,
                        confirmed: false,
                    };
                    setHomeworks([...updatedHomeworks, newHomework]);

                } else {
                    const newHomework = {
                        title: event.target.value,
                        nextClassTime: data.nextclasstime,
                        confirmed: false,
                    };
                    setHomeworks([...homeworks, newHomework]);
                }
            })
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    console.error("Fetch error:", error);
                    alert("Failed to add homework. Please try again later.");
                }
            });
        }
        else {
            // remove last homework if it's unconfirmed
            const lastHWData = homeworks.slice(-1)[0];
            if (lastHWData && !lastHWData.confirmed) {
                setHomeworks(homeworks.slice(0, -1));
            }
        }
    };

    const addHomework = () => {
        if (inputValue.trim() !== "") {
            // edit last homework from unconfirmed to confirmed
            const lastHWData = homeworks.slice(-1)[0];
            if (lastHWData) {
                lastHWData.confirmed = true;
                setHomeworks([...homeworks.slice(0, -1), lastHWData]);
                // clear input value
                setInputValue("");
            }
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
                <form onSubmit={handleSubmit} autoComplete='off'>
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