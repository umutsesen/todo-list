import { RefreshThatTodo } from './TodoListDOM.js'
import { Projects } from './index.js'
export { EditObj, DeleteTodo }



function EditObj(todonum, title, description, date, doneornot, radios, projectnumber) {
    let Edit = Projects[projectnumber].tasks[todonum]
    Edit.title = title
    Edit.description = description
    Edit.duedate = date
    Edit.doneornot = doneornot
    Edit.priority = radios
    RefreshThatTodo(todonum, projectnumber)

}


function DeleteTodo(todonum, projectnumber) {
    delete Projects[projectnumber].tasks[todonum]
    if (Projects[projectnumber].tasks.every(x => x === null)) { 
    Projects[projectnumber].tasks = []
    localStorage.setItem('Projects', JSON.stringify(Projects))
}
    localStorage.setItem('Projects', JSON.stringify(Projects))
    

}
