const express = require("express");
const path = require("path");
const fs = require("fs")

const router = express.Router()


const readFile = (filePath) => {
    const buffer = fs.readFileSync(filePath);
    const content = buffer.toString();
    console.log(content);
    const mainFile = JSON.parse(content)
    console.log(mainFile);
}





const filePath = path.join(__dirname + "students.json")

router.get("/:id", (req, res) => {
    const studentsArray = readFile(filePath);
    const studentId = studentsArray.find(student => {
        student._id === Number.parseInt(req.params.id)
    
    })

    if (studentId) {
        res.send(studentId)
    } else {
        res.status(404).send("student not found")
    }
});

router.get("/", (req, res) => {
    const studentsArray = readFile(filePath);
    res.send(studentsArray)
});

router.post("/", (req, res) => {
    const studentsArray = readFile(filePath)

    /* const emailCheck = studentsArray.find(student => {
        if (students)
    }) */
    const newStudent = {
        ...req.body,
        _id: studentsArray.length + 1,
        createdOn: new Date()
    };
    studentsArray.push(newStudent)
    fs.writeFile(filePath, JSON.stringify(studentsArray))
    res.status(201).send(`Student ${newStudent._id} was Created Successfully`)
    
});

router.put("/:id", (req, res) => {
    const editedStudent = req.body;

    const studentsArray = readFile(filePath);

    studentsArray.filter(student => {
        student._id === Number.parseInt(req.params.id)
    }) = editedStudent
    fs.writeFileSync(filePath, JSON.stringify(studentsArray))
    res.send(editedStudent)
    
});

router.delete("/:id", (req, res) => {
    const studentsArray = readFile(filePath);
    const studentsRemains = studentsArray.filter(student => {
        student._id !== req.params.id
    })
    fs.writeFileSync(filePath, JSON.stringify(studentsRemains))
    res.status(204).send("Deletion successful")
});

module.exports = router;