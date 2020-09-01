export { addObjectProject, addEveryObjectProject, ProjectForm }
import { Projects } from './index.js'
import { AddProject } from './CreateProject.js'



function addObjectProject(title, number) {
    document.getElementById("project").style.display = "none"
    let projectdiv = document.createElement("div")
    projectdiv.id = `${number}project` 
    projectdiv.dataset.id = number
    projectdiv.dataset.hide = "hide"
    let divs = Array.from(document.querySelectorAll('[data-hide~="hide"]'))
    divs.every(x => x.style.display = `none`)
    projectdiv.style.display = "block"
    let span = document.createElement("span")
    span.textContent = title
    document.getElementById("projecttitle").value = ""
    span.addEventListener("click", () => {
        let divs = Array.from(document.querySelectorAll('[data-hide~="hide"]'))
        divs.every(x => x.style.display = `none`)
        projectdiv.style.display = "block"

    })
    document.getElementById("projects").appendChild(span)
    document.getElementById("task").appendChild(projectdiv)
    
    

    
}

function addEveryObjectProject() {
    for (let a = 0; a < Projects.length ;a++) {
        document.getElementById("project").style.display = "none"
        let projectdiv = document.createElement("div")
        projectdiv.id = `${a}project` 
        projectdiv.dataset.id = a
        projectdiv.dataset.hide = "hide"
        let divs = Array.from(document.querySelectorAll('[data-hide~="hide"]'))
        divs.every(x => x.style.display = `none`)
        projectdiv.style.display = "block"
        let span = document.createElement("span")
        span.textContent = Projects[a].project
        document.getElementById("projecttitle").value = ""
        span.addEventListener("click", () => {
            let divs = Array.from(document.querySelectorAll('[data-hide~="hide"]'))
            divs.every(x => x.style.display = `none`)
            projectdiv.style.display = "block"
            
    })
        document.getElementById("projects").appendChild(span)
        document.getElementById("task").appendChild(projectdiv)

}
}


function ProjectForm() {
    document.getElementById("project").style.display = "block"
    document.getElementById("addproject").onclick = function() {
        let title = document.getElementById("projecttitle").value
        if (title != "") {
            AddProject(title)
            localStorage.setItem('Projects', JSON.stringify(Projects))
        }
        else alert("You cannot create a project without name")
        
        }

}