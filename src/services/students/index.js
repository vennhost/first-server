const express = require("express");

const fs = require("fs");
const path = require("path");

const router = express.Router()



const filePath = path.join(__dirname, "students.json");

console.log(filePath)

const readFile = () => {
    const buffer = fs.readFileSync(filePath);
    const content = buffer.toString();
    console.log(content);
    return JSON.parse(content)
    console.log(mainFile);
}



router.get("/:id", (req, res) => {
    const studentsArray = readFile();
    const studentId = studentsArray.find(student => student._id == req.params.id)

    if (studentId) {
        res.send(studentId)
    } else {
        res.status(404).send("student not found")
    }
});

router.get("/", (req, res) => {
    /* const studentsArray = readFile(filePath); */
    res.send(readFile())
});

router.post("/", (req, res) => {
    const studentsArray = readFile()

    /* const emailCheck = studentsArray.find(student => {
        if (students)
    }) */
    const newStudent = { ...req.body, _id: studentsArray.length + 1, createdOn: new Date() };
    studentsArray.push(newStudent)
    fs.writeFileSync(filePath, JSON.stringify(studentsArray))
    res.status(201).send(`Student ${newStudent._id} was Created Successfully`)
    
});

router.put("/:id", (req, res) => {
    

    const studentsArray = readFile();

    const editedStudent = studentsArray.find(student => student._id == req.params.id) 
    
    if (editedStudent)
   { 
    const mergedStudent = Object.assign(editedStudent, req.body)
    const position = studentsArray.indexOf(editedStudent) 
    studentsArray[position] = mergedStudent  
    fs.writeFileSync(filePath, JSON.stringify(studentsArray))
    res.send(mergedStudent)
} else {
    res.status(404).send("Student not found")
}
    
});

router.delete("/:id", (req, res) => {
    const studentsArray = readFile();
    const studentsRemains = studentsArray.find(student => student._id != req.params.id)
    if (studentsRemains.length < studentsArray.length) {
    fs.writeFileSync(filePath, JSON.stringify(studentsRemains))
    res.status(204).send("Deletion successful")
    }
    else {
        res.status(404).send("Student Not Found")
    }
});

module.exports = router;