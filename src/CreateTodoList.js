import { Projects } from './index.js'
export { CreateTodoList }


function CreateTodoList(title, description, duedate, priority, doneornot, currentproject) {
    return Projects[currentproject].tasks.push({title, description, duedate, priority, doneornot})
}