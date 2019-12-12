const express = require("express");

const fs = require("fs");
const path = require("path");

const router = express.Router()



const filePath = path.join(__dirname, "projects.json");

console.log(filePath)

const readFile = () => {
    const buffer = fs.readFileSync(filePath);
    const content = buffer.toString();
    console.log(content);
    return JSON.parse(content)
    console.log(mainFile);
}



router.get("/:id", (req, res) => {
    const projects = readFile();
    const studentProjects = projects.find(project => project._id == req.params.id)

    if (studentProjects) {
        res.send(studentProjects)
    } else {
        res.status(404).send("project not found")
    }
});

router.get("/", (req, res) => {
    
    res.send(readFile())
});

router.post("/", (req, res) => {
    const projects = readFile()

    /* const emailCheck = studentsArray.find(student => {
        if (students)
    }) */
    const newProject = { ...req.body, _id: projects.length + 1, creationTime: new Date() };
    projects.push(newProject)
    fs.writeFileSync(filePath, JSON.stringify(projects))
    res.status(201).send(`Projects ${newProject._id} was Created Successfully`)
    
});

router.put("/:id", (req, res) => {
    

    const projects = readFile();

    const editedStudent = projects.find(project => project._id == req.params.id) 
    
    if (editedProject)
   { 
    const mergedProject = Object.assign(editedProject, req.body)
    const position = studentsArray.indexOf(editedProject) 
    projects[position] = mergedProject  
    fs.writeFileSync(filePath, JSON.stringify(projects))
    res.send(mergedProject)
} else {
    res.status(404).send("Student not found")
}
    
});

router.delete("/:id", (req, res) => {
    const projects = readFile();
    const projectRemains = projects.find(project => project._id != req.params.id)
    if (projectRemains.length < projects.length) {
    fs.writeFileSync(filePath, JSON.stringify(projectRemains))
    res.status(204).send("Deletion successful")
    }
    else {
        res.status(404).send("Student Not Found")
    }
});

module.exports = router;