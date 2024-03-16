import './App.css';

function App() {
  function handleClick() {
    let homeworkInput = document.getElementById("homeworkInput");
    let homeworkList = document.getElementById("homeworkList");
    let homeworkItem = document.createElement("div");
    let homeworkTitleName = document.createElement("h1");
    let homework = homeworkInput.value;
        if (homework.length > 0) {
            try{
                
                homeworkList.appendChild(document.createElement("br"));

                
                homeworkItem.className = "homeworkItem";

                homeworkTitleName = document.createElement("h1");
                homeworkTitleName.className = "homeworkTitleName";
                homeworkTitleName.innerText = homeworkInput.value;
                homeworkItem.appendChild(homeworkTitleName);

                fetch('https://nw-classrum.nicewhite.xyz/subject', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'text': homeworkInput.value,
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        let nextclasstime = data['nextclasstime'];
                        let homeworkNextTimeDateBG = document.createElement("div");
                        homeworkNextTimeDateBG.className = "homeworkNextTimeDateBG";
                        homeworkNextTimeDateBG.innerText = nextclasstime;
                        homeworkItem.appendChild(homeworkNextTimeDateBG);
                    }
                    )

                homeworkList.appendChild(homeworkItem);
                homeworkList.appendChild(document.createElement("br"));
                console.log("Homework added");
                
            }
            catch(err){

                homeworkList = document.createElement("div");
                homeworkList.id = "homeworkList";
                document.body.appendChild(homeworkList);
                console.log("Homework list created");
                
                homeworkList.appendChild(document.createElement("br"));

                let homeworkItem = document.createElement("div");
                homeworkItem.className = "homeworkItem";

                homeworkTitleName = document.createElement("h1");
                homeworkTitleName.className = "homeworkTitleName";
                homeworkTitleName.innerText = homeworkInput.value;
                homeworkItem.appendChild(homeworkTitleName);

                fetch('https://nw-classrum.nicewhite.xyz/subject', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'text': homeworkInput.value,
                    }),
                })

                    .then((response) => response.json())
                    .then((data) => {
                        let nextclasstime = data['nextclasstime'];
                        let homeworkNextTimeDateBG = document.createElement("div");
                        homeworkNextTimeDateBG.className = "homeworkNextTimeDateBG";
                        homeworkNextTimeDateBG.innerText = nextclasstime;
                        homeworkItem.appendChild(homeworkNextTimeDateBG);
                    }
                    )

                homeworkList.appendChild(homeworkItem);
                homeworkList.appendChild(document.createElement("br"));
                console.log("Homework added");
            }
            homeworkInput.value = "";
        }

  }
  return (

      <><h1 id="homeworkTitle">Homeworks</h1><div id="homeworkInputArea">
          <input type="text" id="homeworkInput" placeholder="Add new homework..."></input>
          <button id="addHomeworkBtn" onClick={handleClick}>Add</button>
      </div></>


);
}

export default App;
