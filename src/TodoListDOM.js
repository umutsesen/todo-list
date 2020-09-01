import { Projects } from './index.js'
import { EditObj, DeleteTodo } from './EditTodoList.js'
import { CreateTodoList } from './CreateTodoList.js'
export { DOMTodoList, EditTodo, RefreshThatTodo, DOMRefreshedTodoList, render, AddTask }



function AddTask() {
    document.getElementById('todolistform').style.display = "none"
    let title = document.getElementById('title').value
    let description = document.getElementById('description').value
    let duedate = document.getElementById('date').value
    let radios = document.getElementsByName('priority')
    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            radios = radios[i].value;
            break;
        }
    }
    let projects = Array.from(document.querySelector("#task").children)
    let currentproject = projects.filter(project => project.style.display == 'block')
    let realcurrentproject = currentproject[0].dataset.id
    CreateTodoList(title, description, duedate, radios, `Waiting`, realcurrentproject)
    DOMTodoList(realcurrentproject)
    localStorage.setItem('Projects', JSON.stringify(Projects))

    //DOM clean vals
    document.getElementById('title').value = ""
    document.getElementById('description').value = ""
    document.getElementById('date').value = ""
}









// Create Task
function DOMTodoList(currentproject) {
    let projectnumber = currentproject
    let ProjectNumSpecificDiv = document.getElementById(`${projectnumber}project`)
    let project = Projects[projectnumber].tasks
    let todo = project.length - 1 //dataset ile projectin numberi koyulacak style none yapıalcak
    let div = document.createElement(`div`)
    div.id = todo
    div.className = "card bg-light mb-3"
    div.style.width = "300px"
    div.style.height = "300px"
    div.style.margin = "20px"
    div.style.padding = "30px"
    div.style.overflow = "auto"
    div.style.display = "inline-block"
    div.style.lineHeight = "2"
    let title = document.createElement(`h5`)
    title.textContent = project[todo].title
    title.className = "card-title"
    let description = document.createElement(`span`)
    description.textContent = "Description: " + project[todo].description
    description.className = "card-text"
    let duedate = document.createElement(`span`) /// webpackle hallet npm
    duedate.textContent = "Due Date: " + project[todo].duedate /// webpackle hallet npm
    duedate.className = "card-text"
    let priority = document.createElement(`span`)
    priority.textContent = "Priority: " + project[todo].priority
    priority.className = "card-text"
    let done = document.createElement(`span`)
    done.textContent = "Status: " + project[todo].doneornot
    done.className = "card-text"
    let button = document.createElement("button") //editbutton
    button.textContent = "Edit"
    button.className = "btn btn-primary"
    button.addEventListener("click", () => {
        EditTodo(div.id, projectnumber)
    })
    let closebutton = document.createElement("button")
    closebutton.className = "close"
    closebutton.type = "button"
    closebutton.addEventListener("click", () => {
        ProjectNumSpecificDiv.removeChild(div)
        DeleteTodo(div.id, projectnumber)

    })
    closebutton.setAttribute("aria-label", "Close")
    let insideclosebutton = document.createElement("span")
    insideclosebutton.setAttribute("aria-hidden", "true")
    insideclosebutton.innerHTML = "&times;"
    ProjectNumSpecificDiv.appendChild(div)
    div.appendChild(closebutton)
    closebutton.appendChild(insideclosebutton)
    div.appendChild(title)
    div.appendChild(description)
    div.appendChild(duedate)
    div.appendChild(priority)
    div.appendChild(done)
    div.appendChild(button)
}

function EditTodo(todonum, projectnumber) {
    let project = Projects[projectnumber].tasks
    let formtitle = document.getElementById('title')
    let formdesc = document.getElementById('description')
    let todolistform = document.getElementById('todolistform')
    let formdate = document.getElementById('date')
    let radios = document.getElementsByName('priority')
    let submitbutton = todolistform.lastElementChild
    todolistform.removeChild(todolistform.lastElementChild)
    let checkboxform = document.createElement("input")
    checkboxform.setAttribute("type", "checkbox")
    let editbutton = document.createElement("button")
    editbutton.textContent = "Edit"
    // DOM
    // BURAYA AYRI FUNCTION AC OYLE VALUELERI YOLLA
    editbutton.addEventListener("click", function () {
        for (let i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                radios = radios[i].value;
                break;
            }
          }
         if (checkboxform.checked == true) {
            
            EditObj(todonum, formtitle.value, formdesc.value, formdate.value, "Done", radios, projectnumber)
         }
         else EditObj(todonum, formtitle.value, formdesc.value, formdate.value, "Waiting", radios, projectnumber)

         todolistform.style.display = "none"
         editbutton.replaceWith(submitbutton)
         checkboxform.remove()
         // need to change form into its original state since i thought that i was creating form dynamically but apparently not // or i have to create a new edit form in html.
         
        })
    todolistform.appendChild(checkboxform)
    todolistform.appendChild(editbutton)    
    todolistform.style.display = "block" //DOM TEKER TEKER TEMIZLE LET ILE OLMADI VARIABLES DIYE
    formtitle.value = project[todonum].title
    formdesc.value = project[todonum].description
    formdate.value = project[todonum].date  /// webpackle hallet npm
    localStorage.setItem('Projects', JSON.stringify(Projects))
     
}


function RefreshThatTodo(todonum, projectnumber) {
    let project = Projects[projectnumber].tasks
    let div = document.getElementById(todonum)
    div.children[1].textContent = project[todonum].title // header in line // repeating since i did not create seperate spans for "info:"
    div.children[2].textContent = "Description: " + project[todonum].description
    div.children[3].textContent = "Due Date: " + project[todonum].duedate
    div.children[4].textContent = "Priority: " + project[todonum].priority
    div.children[5].textContent = "Status: " + project[todonum].doneornot
    project[todonum].doneornot == 'Done' ? div.className = "card text-white bg-success mb-3": "skip"
    

}


// for refreshing page render again

function DOMRefreshedTodoList(currentproject) {
    let projectnumber = currentproject
    let ProjectNumSpecificDiv = document.getElementById(`${projectnumber}project`)
    let project = Projects[projectnumber].tasks
    for (let a = 0; a < project.length; a++) {
        if (Projects[projectnumber].tasks[a] !== null) {
        let todo = a //dataset ile projectin numberi koyulacak style none yapıalcak
        let div = document.createElement(`div`)
        div.id = todo
        div.className = "card bg-light mb-3"
        div.style.width = "300px"
        div.style.height = "300px"
        div.style.margin = "20px"
        div.style.padding = "30px"
        div.style.overflow = "auto"
        div.style.display = "inline-block"
        div.style.lineHeight = "2"
        let title = document.createElement(`h5`)
        title.textContent = project[todo].title
        title.className = "card-title"
        let description = document.createElement(`span`)
        description.textContent = "Description: " + project[todo].description
        description.className = "card-text"
        let duedate = document.createElement(`span`) /// webpackle hallet npm
        duedate.textContent = "Due Date: " + project[todo].duedate /// webpackle hallet npm
        duedate.className = "card-text"
        let priority = document.createElement(`span`)
        priority.textContent = "Priority: " + project[todo].priority
        priority.className = "card-text"
        let done = document.createElement(`span`)
        done.textContent = "Status: " + project[todo].doneornot
        done.className = "card-text"
        let button = document.createElement("button") //editbutton
        button.textContent = "Edit"
        button.className = "btn btn-primary"
        button.addEventListener("click", () => {
            EditTodo(div.id, projectnumber)
        })
        let closebutton = document.createElement("button")
        closebutton.className = "close"
        closebutton.type = "button"
        closebutton.addEventListener("click", () => {
            ProjectNumSpecificDiv.removeChild(div)
            DeleteTodo(div.id, projectnumber)
            

        })
        closebutton.setAttribute("aria-label", "Close")
        let insideclosebutton = document.createElement("span")
        insideclosebutton.setAttribute("aria-hidden", "true")
        insideclosebutton.innerHTML = "&times;"
        ProjectNumSpecificDiv.appendChild(div)
        div.appendChild(closebutton)
        closebutton.appendChild(insideclosebutton)
        div.appendChild(title)
        div.appendChild(description)
        div.appendChild(duedate)
        div.appendChild(priority)
        div.appendChild(done)
        div.appendChild(button)
    }
    }
}


function render() {
    let projects = Array.from(document.querySelector("#task").children)
    for (let a = 0; a < projects.length;a++) {
        let realcurrentproject = projects[a].dataset.id
        DOMRefreshedTodoList(realcurrentproject)
        }
}