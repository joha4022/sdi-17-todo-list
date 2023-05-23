// displays current date
const newDate = new Date();

const year = newDate.getFullYear();
const month = newDate.getMonth();
const date = newDate.getDate();
const day = newDate.getDay();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let tasks = [];

document.getElementById("current-date").innerHTML = `${weekday[day]} &nbsp ${date} ${months[month-1]} ${year}`;

// inputbox event listener and create
const inputbox = document.querySelector('.input-box');
const todoList = document.querySelector('ol');
const addList = document.createElement('li');

    // if the first list item is still display example then remove
inputbox.addEventListener('input', (event) => {
    if(todoList.children[0].id === 'example-todo') {
        todoList.removeChild(todoList.children[0]);
        todoList.appendChild(addList);
        todoList.children[0].id = `list-${todoList.children.length}`
    } else {
        // else create a new li and display the typing list
        todoList.children[todoList.children.length-1].style.display = '';
        todoList.children[todoList.children.length-1].innerHTML = event.target.value;
    }
});

// event listener for submit button and remove default action. When the submit
// button is pressed, it creates a checkmark box.
const submitButton = document.querySelector('.submit-button');
const checkbox = ` <input type="checkbox" class="box" onclick="strike()"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Flat_cross_icon.svg/1200px-Flat_cross_icon.svg.png">`;

submitButton.addEventListener('click', (event) => {
    if(inputbox.value.length > 0 ) {
        todoList.children[todoList.children.length-1].innerHTML += checkbox;
        todoList.children[todoList.children.length-1].children[0].id = `${todoList.children.length}`;
        todoList.children[todoList.children.length-1].children[1].id = `${todoList.children.length}`;
        todoList.children[todoList.children.length-1].children[1].addEventListener('click', event => {
            todoList.removeChild(todoList.children[event.target.id-1]);
        });
        let obj = { test : `${todoList.children[todoList.children.length-1].textContent}` }
        tasks.push(obj);
        window.localStorage.setItem(`list-${todoList.children.length-1}`, `${todoList.children[todoList.children.length-1].textContent}`);
        inputbox.value = '';
        todoList.appendChild(document.createElement('li'));
        todoList.children[todoList.children.length-1].style.display = 'none';
        todoList.children[todoList.children.length-1].id = `list-${todoList.children.length}`;
    }
});

// when enter is pressed, execute the same event.
inputbox.addEventListener('keypress', (event) => {
    if(inputbox.value.length > 0 && event.key === 'Enter') {
        todoList.children[todoList.children.length-1].innerHTML += checkbox;
        todoList.children[todoList.children.length-1].children[0].id = `${todoList.children.length}`;
        todoList.children[todoList.children.length-1].children[1].id = `${todoList.children.length}`;
        todoList.children[todoList.children.length-1].children[1].addEventListener('click', event => {
            todoList.removeChild(todoList.children[event.target.id-1]);
        });
        let obj = { test : `${todoList.children[todoList.children.length-1].textContent}` }
        tasks.push(obj);
        window.sessionStorage.setItem(`list-${todoList.children.length-1}`, `${todoList.children[todoList.children.length-1].textContent}`);
        inputbox.value = '';
        todoList.localStorage(document.createElement('li'));
        todoList.children[todoList.children.length-1].style.display = 'none';
        todoList.children[todoList.children.length-1].id = `list-${todoList.children.length}`;
    }
});

// reset button
const resetButton = document.querySelector('#reset-button');

resetButton.addEventListener('click', (event) => {
    if(todoList.children[0].id !== 'example-todo') {
        todoList.innerHTML = `<li id="example-todo">To do... <input type="checkbox" class="box"></li>`
    }
});

// when the checkbox is checked, strikes through the li on the same level
const strike = () => {
    const boxes = document.querySelectorAll('.box');
    let completed = 0;

    for(let item of boxes) {
        if(item.checked) {
            document.querySelector(`#list-${item.id}`).style.textDecoration = 'line-through';
            ++completed;
        } else {
            document.querySelector(`#list-${item.id}`).style.textDecoration = '';
        }
    }
    percentage.innerHTML = `${Math.round((completed / document.querySelectorAll('.box').length * 100))}% Complete`;    
}