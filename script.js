const addName = document.querySelector("#add-name");
const addButton = document.querySelector("#add-button");
const listBody = document.querySelector("#dice-list");
const diceButton = document.querySelector("#dice-button");
const clearButton = document.querySelector("#clear-button");
const messageBox = document.querySelector('.message-div');
const winnerBox = document.querySelector('.winner-div');

addButton.addEventListener("click", addNameAll);
diceButton.addEventListener("click", playDice);
clearButton.addEventListener("click", clearList);
listBody.addEventListener("click", selfDelete);


let nameList = [];
let nameListUI = [];
let count = 0;
let selectName;


function addNameAll(e) {
    if (addName.value != '') {
        nameList.push(addName.value);
        addNameUI(nameList);
        addName.value = "";
    }
    e.preventDefault();
}
function addNameUI(name) {
    count++;
    id = count - 1;
    let nameListAdd = document.createElement("tr");
    nameListAdd.innerHTML += `
                            <tr>
                                <td>${id}</td>
                            </tr>
                            <tr>
                                <td>${nameList[id]} <i class="fas fa-ban" style="margin-left : 10px;"></i></td>
                            </tr>`;

    listBody.appendChild(nameListAdd);
}
function selfDelete(e) {
    if (e.target.className === "fas fa-ban") {  
        console.log(selectName);
        selectName = e.target.parentElement.previousElementSibling.textContent;
        nameList.splice(selectName,1);
        count--;
        e.target.parentElement.parentElement.remove();
        showAlert("An item was deleted","warning");
    }
}

function playDice(e) {
    if(nameList.length > 1){
        let winnerNumber = Math.floor(Math.random() * nameList.length);
        let winner = nameList[winnerNumber];
        listBody.children[winnerNumber].style = "background-color : green; transition : 1ms;"
        showWinner(winner);
        
    }else{
        showAlert("You cannot draw lots with just one person","danger");
    }
    e.preventDefault();

}

function clearList(e) {
    clearAll();
    e.preventDefault();
}

function showAlert(message,alrt){
    var html = `<div class="alert alert-${alrt} mt-2" role="alert">
    ${message}
    </div>`;
    messageBox.innerHTML = html;
    setTimeout(()=> {
        messageBox.innerHTML = "";
    },2000)
}

function showWinner(winner){
    var html = `<div class="alert alert-success text-center" role="alert">
        <span style="font-size : 17px; font-weight:bold;">${winner}</span> won congratulations !
    </div>`;
    winnerBox.innerHTML = html;
    setTimeout(() => {
        clearAll();  
    }, 5000);
}

function clearAll(){
    listBody.innerHTML = "";
    nameList = [];
    count = 0;
    winnerBox.innerHTML = "";
}