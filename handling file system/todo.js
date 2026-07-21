const fs = require('fs')
const filepath = "./tasks.json"

const command = process.argv[2]
const argument = process.argv[3]


//Reading the file
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

const saveTasks = (tasks) => {
    dataJSON = JSON.stringify(tasks) //it's just a string
    fs.writeFileSync(filepath, dataJSON)
}

const listTasks = ()=>{
    const tasks = loadTasks()
    tasks.forEach((task, index)=>console.log(`${index+1}- ${task.task}`))
}

const addTask = (task) => { //here we are writing to the file by calling saved tasks.
    const tasks = loadTasks()
    tasks.push({task})
    saveTasks(tasks)
    console.log("Task added.")
    listTasks();
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
    addTask(argument)
}
else if (command === "list"){
    listTasks()
}
else if (command === "remove"){
    removeTask(argument)
}
else {
    console.log("Command not found!")
}