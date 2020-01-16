const express = require("express");
const multer = require("multer");
const db = require("../../../db")
const { readFile, writeFile } = require("fs-extra");
const { join } = require("path");
const router = express.Router();
const Student = require("../../model/student")
const Project = require("../../model/project")



const filePath = join(__dirname, "students.json");
const uploadURL = join(__dirname, "../../../public/img/students/");

console.log(filePath)

const upload = multer({});

/* const readFile = () => {
    const buffer = fs.readFileSync(filePath);
    const content = buffer.toString();
    return JSON.parse(content)
   
} */

const loadStudents = async () => {
    return await Student.find()
}
//image upload and download session
router.post("/:id/upload", upload.single("image"), async (req, res, next) => {
    const file = req.file;
    const filename = req.params.id.toString() + ".jpeg"
    await writeFile(join(uploadURL, /* file.originalname */ filename), file.buffer);
    console.log(req.file.originalname)
    res.send("File Upload Successful")
});


router.get("/", async (req, res) => {
    const response = await db.query("SELECT * FROM Students")
    res.send(response.rows)
    //res.send(await loadStudents())

});

/* router.get("/", async (req, res) => {
    const students = await loadStudents()
    const total = students.length

    const limit = req.query.limit || 2
    const start = req.query.start || 0

    delete req.query.limit
    delete req.query.start

    for (let key in req.query) {
        students = Student.find(q => q[key] == req.query[key])
    }
    res.send({
        result: students.splice(start, limit),
        total: total,
        next: `http://localhost:3001/students?country=${req.query.country}${limit}`
    })
}); */

router.get("/", async (req, res) => {

    if (req.query.country)
        return await Student.find({ country: req.query.country })

    else
        res.send("Not Found")
});

router.get("/:id", async (req, res) => {

    const response = await db.query("SELECT * FROM students WHERE _id = $1", [req.params.id])
    res.send(response.rows)

    /*  const student = await Student.findById(req.params.id)
     if (student)
         res.send(student)
     else
         res.status(404).send("Not Found") */
});


router.get("/:fileName/download", async (req, res, next) => {

    const { fileName } = req.params
    const buffer = await readFile(join(uploadURL, fileName));
    res.send(buffer)

});


//Student information Post session

/* router.get("/:id", async (req, res) => {
    //const studentsArray = readFile();
    const buffer = await readFile(filePath);
    const content = buffer.toString();
    const studentsArray = JSON.parse(content)
    const studentId = studentsArray.find(student => student._id == req.params.id)

    if (studentId) {
        res.send(studentId)
    } else {
        res.status(404).send("student not found")
    }
}); */

/* router.get("/", async (req, res) => {
    

    const buffer = await readFile(filePath);
    const content = buffer.toString();
    const studentsArray = JSON.parse(content)
    res.send(studentsArray)
}); */

router.post("/", async (req, res) => {
    try {
        const response = await db.query(
            `INSERT INTO students (firstName, lastName, email, dateOfBirth) VALUES ($1,$2,$3,$4) RETURNING *`,
            [req.body.firstname, req.body.lastname, req.body.email, req.body.dateofbirth])

        res.send(response.rows)
    }
    catch (err) {
        res.send(err)
        console.log(err)
    }

    /* try {
    const student = await Student.create({...req.body, createdDate: new Date()})
    student.save()
    res.send(student)
    }
    catch(err) {
        res.send(err)
    } */

    /*  //const studentsArray = readFile()
     const buffer = await readFile(filePath);
     const content = buffer.toString();
     const studentsArray = JSON.parse(content)
 
 
     
     const newStudent = { ...req.body, _id: studentsArray.length + 1, createdOn: new Date() };
     studentsArray.push(newStudent)
     await writeFile(filePath, JSON.stringify(studentsArray))
     res.status(201).send(`Student ${newStudent._id} was Created Successfully`) */

});

router.put("/:id", async (req, res) => {
    try {
        const response = await db.query("UPDATE students SET firstname = $1, lastname = $2, email = $3, dateofbirth = $4 WHERE _id = $5 RETURNING *",
            [req.body.firstname, req.body.lastname, req.body.email, req.body.dateofbirth, req.params.id])
        res.send(response.rows)
    }
    catch (err) {
        res.send(err)
        console.log(err)
    }
    /* delete req.body.createdDate
    delete req.body._id
    delete req.body.__v

    
    const student = await Student.findByIdAndUpdate(req.params.id, { $set: {...req.body}})

    if (student) 
        res.send("Updated Successfully")
    else
        res.send("Student Not Found") */

    /*  // const studentsArray = readFile();
  
      const buffer = await readFile(filePath);
      const content = buffer.toString();
      const studentsArray = JSON.parse(content)
  
      const editedStudent = studentsArray.find(student => student._id == req.params.id) 
      
      if (editedStudent)
     { 
      const mergedStudent = Object.assign(editedStudent, req.body)
      const position = studentsArray.indexOf(editedStudent) 
      studentsArray[position] = mergedStudent  
      await writeFile(filePath, JSON.stringify(studentsArray))
      res.send(mergedStudent) */
    /* } else {
        res.status(404).send("Student not found")
    } */

});

router.delete("/:id", async (req, res) => {

    const student = await Student.findByIdAndDelete(req.params.id)
    if (student)
        res.send("Deleted Successfully")

    else
        res.send("Student Not Found")

    /*  // const studentsArray = readFile();
 
     const buffer = await readFile(filePath);
     const content = buffer.toString();
     const studentsArray = JSON.parse(content)
 
     const studentsRemains = studentsArray.find(student => student._id != req.params.id)
     if (studentsRemains.length < studentsArray.length) {
     await writeFile(filePath, JSON.stringify(studentsRemains))
     res.status(204).send("Deletion successful")
     }
     else {
         res.status(404).send("Student Not Found")
     } */
});



/* Project Routes */

router.get("/:id/projects/:projId", async (req, res, next) => {

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

router.get("/:id/projects/", async (req, res, next) => {

    const student = await Student.findById(req.params.id)

    res.send(student.projects)


    /* const buffer = await readFile(filePath);
    const content = buffer.toString();
    const projects = JSON.parse(content)
    res.send(projects) */
});

router.post("/:id/projects", async (req, res, next) => {
    const newProject = req.body

    try {
        const project = await Student.findByIdAndUpdate(req.params.id, { $push: { projects: newProject } })
        res.send(project)
    }
    catch (err) {
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

    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body)

        res.send("Updated!")
    }
    catch (err) {
        res.send(err)
    }


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