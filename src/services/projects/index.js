const express = require("express");

const {readFile, writeFile} = require("fs-extra");
const {join} = require("path");

const router = express.Router()

const Project = require("../../model/project")



const filePath = join(__dirname, "projects.json");
const reviewPath = join(__dirname, "reviews.json");

console.log(filePath)
/* 
const readFile = () => {
    const buffer = await readFile(filePath);
    const content = buffer.toString();
    return JSON.parse(content)
    
} */



router.post("/:id/review", async (req, res, next) => {
    const buffer = await readFile(reviewPath);
    const content = buffer.toString();
    const reviews = JSON.parse(content);

    const newReview = {
        ...req.body,
        projectId: req.params.id,
        _id: reviews.length +1,
        date: new Date()
    };
    reviews.push(newReview);
    await writeFile(reviewPath, JSON.stringify(reviews));
    res.send(`Thanks for you review ${newReview._id}`)
})



router.get("/:id", async (req, res, next) => {

    const project = await Project.findById(req.params.id)

    res.send(project)
    /* //const projects = readFile();

    const buffer = await readFile(filePath);
    const content = buffer.toString();
    const projects = JSON.parse(content)

    const studentProjects = projects.find(project => project._id == req.params.id)

    if (studentProjects) {
        res.send(studentProjects)
    } else {
        res.status(404).send("project not found")
    } */
});

router.get("/", async (req, res, next) => {

    if (req.query.title) {
        const projects = await Project.find({title: req.query.title})
        res.send(projects)
    }

    /* const projects = await Project.find({})

    res.send(projects) */
    /* const buffer = await readFile(filePath);
    const content = buffer.toString();
    const projects = JSON.parse(content)
    res.send(projects) */
});

router.post("/", async (req, res, next) => {
    try {
    const project = await Project.create({...req.body, createdDate: new Date()})

    project.save()
    res.send(project)
    }
    catch(err) {
        res.send(err)
    }
   /*  //const projects = readFile()

    const buffer = await readFile(filePath);
    const content = buffer.toString();
    const projects = JSON.parse(content)

    /* const emailCheck = studentsArray.find(student => {
        if (students)
    }) */
    /*const newProject = { ...req.body, _id: projects.length + 1, creationTime: new Date() };
    projects.push(newProject)
    await writeFile(filePath, JSON.stringify(projects))
    res.status(201).send(`Projects ${newProject._id} was Created Successfully`) */
    
});

router.put("/:id", async (req, res, next) => {


    const project = await Project.findByIdAndUpdate(req.params.id, req.body)

    res.send("Updated!")


/*     //const projects = readFile();

    const buffer = await readFile(filePath);
    const content = buffer.toString();
    const projects = JSON.parse(content)

    const editedProject = projects.find(project => project._id == req.params.id) 
    
    if (editedProject)
   { 
    const mergedProject = Object.assign(editedProject, req.body)
    const position = studentsArray.indexOf(editedProject) 
    projects[position] = mergedProject  
    await writeFile(filePath, JSON.stringify(projects))
    res.send(mergedProject)
} else {
    res.status(404).send("Student not found")
}
    */ 
});

router.delete("/:id", async (req, res, next) => {

    const project = await Project.findByIdAndDelete(req.params.id)
    res.send("Deleted!")
   /*  //const projects = readFile();

    const buffer = await readFile(filePath);
    const content = buffer.toString();
    const projects = JSON.parse(content)

    const projectRemains = projects.find(project => project._id != req.params.id)
    if (projectRemains.length < projects.length) {
    await writeFile(filePath, JSON.stringify(projectRemains))
    res.status(204).send("Deletion successful")
    }
    else {
        res.status(404).send("Student Not Found")
    } */
});

module.exports = router;