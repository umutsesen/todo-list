export { AddProject }
import { addObjectProject } from './CreateProjectDOM.js'
import { Projects } from './index.js'
 

function AddProject(title) {
    let project = title
    let tasks = []
    addObjectProject(title, Projects.length)
    return Projects.push({ project, tasks }) 

}

