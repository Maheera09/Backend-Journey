const fs = require('fs')
const filepath = "./tasks.json"

const command = process.argv[2]
const arguement = process.argv[3]

const loadTasks = () =>{ //basically, here we are reading the file and loading the contants.
    try {
        const  dataBuffer = fs.readFileSync(filepath) //Reads the file tasks.json synchronously. Returns a Buffer (binary data). It's an object and you have to convert it to string 
        const dataJSON = dataBuffer.toString() 
        return JSON.parse(dataJSON) //Converts the JSON string into a JavaScript object or array.
    }
    catch(error) {
return[]
    }
}

const listTasks = ()=>{
    const tasks = loadTasks()
    tasks.forEach((task, index)=>console.log(`${index+1}- ${task.task}`))
}

const saveTasks = (tasks) => {
    dataJSON = JSON.stringify(tasks) //it's just a string
    fs.writeFileSync(filepath, dataJSON)
}

const addTask = (task) => { //here we are writing to the file by calling saved tasks.
    const tasks = loadTasks()
    tasks.push({task})
    saveTasks(tasks)
    console.log("Task added.")
} 

const removeTask = (id)=>{
    const tasks  = loadTasks()
    const index = Number(id) - 1
   if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1)
        saveTasks(tasks)
        console.log("Task removed.")
    } else {
        console.log("Invalid task ID.")
    }
}

if (command === "add"){
    addTask(arguement)
}
else if (command === "list"){
    listTasks()
}
else if (command === "remove"){
    removeTask(arguement)
}
else {
    console.log("Command not found!")
}