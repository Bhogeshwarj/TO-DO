import{ initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import{ getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
// import { initializeApp } from 'firebase/app'; 
// use for build
// import { getDatabase, ref, push, onValue, remove } from 'firebase/database'; 
// use for build
import config from "../config.js"

// Use Firebase functionalities here

const appSetting = {
    databaseURL : config.DATABASE_URL
}

const app = initializeApp(appSetting)
const database = getDatabase(app)
const taskListInDB = ref(database,"tasks")
const inputField = document.getElementById("input-el")
const addButtonEl = document.getElementById("add-button")
const taskListEl = document.getElementById("dailytasks")

addButtonEl.addEventListener("click",function(){
    let inputValue = inputField.value
    push(taskListInDB,inputValue)
    clearInputField()
})
onValue(taskListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearTaskList()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToTaskListEl(currentItem)
        }    
    } else {
        taskListEl.innerHTML = "No Tasks..."
    }
})

function clearTaskList(){
    taskListEl.innerHTML=""
}

function clearInputField(){
    inputField.value=""
}

function appendItemToTaskListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("dblclick", function() {
        let exactLocationOfItemInDB = ref(database, `tasks/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    taskListEl.append(newEl)
}