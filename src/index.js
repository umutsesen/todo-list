import { AddProject } from './CreateProject.js'
import _ from 'lodash';
import { CreateTodoList } from './CreateTodoList.js'
import { DOMTodoList, render, AddTask } from './TodoListDOM.js'
import { addEveryObjectProject, ProjectForm } from './CreateProjectDOM.js'



let Projects = []
if (localStorage.getItem("Projects")) {
    Projects = JSON.parse(localStorage.getItem("Projects"))
    addEveryObjectProject(); // render every project 
    render() // every project's tasks
}
else {
    AddProject(`Default Project`) // add obj project
    localStorage.setItem('Projects', JSON.stringify(Projects));
    
}


document.addEventListener(`DOMContentLoaded`, function () {
    
    document.getElementById('addtask').addEventListener('click', () => AddTask())
    document.getElementById('projectform').addEventListener('click', () => ProjectForm())
        
        
 

    })




export { Projects }