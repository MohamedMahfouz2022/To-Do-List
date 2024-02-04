const inputBox = document.querySelector(".input")
const butonAdd = document.querySelector(".add")
const tasks = document.querySelector(".tasks")
const deleteAll = document.querySelector("div span")
//--------------------------------------------------

let arrayOfTasks = []

if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
    createTask(arrayOfTasks)
}

getTaslFromLocalStorage()

butonAdd.onclick = function () {
    if (inputBox.value !== "") {
        addTaskToArray(inputBox.value)
        inputBox.value = ""
    }
}

tasks.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        deletTask(e.target.parentElement.getAttribute("data-id"))
        e.target.parentElement.remove()
    }

    if (e.target.classList.contains("task")) {
        changestate(e.target.getAttribute("data-id"))
        e.target.classList.toggle("active")
    }
})

function addTaskToArray(inputText) {
    const task = {
        id: Date.now(),
        content: inputText,
        completed: false
    }
    arrayOfTasks.push(task)
    createTask(arrayOfTasks)
    addTaskToLocalStorage(arrayOfTasks)

}

function createTask(arrayOfTasks) {
    tasks.innerHTML = ""

    arrayOfTasks.forEach(function (task) {
        let div = document.createElement("div")
        div.className = "task"

        if (task.completed) {
            div.className = "task active"
        }

        div.setAttribute("data-id", task.id)
        div.appendChild(document.createTextNode(task.content))

        let span = document.createElement("span")
        span.className = "del"
        span.appendChild(document.createTextNode("Delete"))

        div.appendChild(span)
        tasks.appendChild(div)

    })
}

function addTaskToLocalStorage(arrayOfTasks) {
    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}

function getTaslFromLocalStorage() {
    let data = localStorage.getItem("tasks")
    if (data) {
        let tasks = JSON.parse(data)
        createTask(arrayOfTasks)
        console.log(tasks)
    }
}

function deletTask(id) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != id)
    addTaskToLocalStorage(arrayOfTasks)
}

function changestate(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false)
        }
    }
    addTaskToLocalStorage(arrayOfTasks)
}
