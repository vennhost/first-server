const express = require("express");
const multer = require("multer");
const {readFile, writeFile} = require("fs-extra");
const { join } = require("path");
const router = express.Router();
const Student = require("../../model/student")



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
    const  filename= req.params.id.toString() + ".jpeg"
    await writeFile(join(uploadURL, /* file.originalname */ filename), file.buffer);
    console.log(req.file.originalname)
    res.send("File Upload Successful")
});


router.get("/", async (req, res) => {
    
    res.send(await loadStudents())
});


router.get("/:fileName/download", async (req, res, next) => {
    
    const { fileName } = req.params
    const buffer = await readFile(join(uploadURL, fileName));
        res.send(buffer)
    
});


//Student information Post session

router.get("/:id", async (req, res) => {
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
});

router.get("/", async (req, res) => {
    /* const studentsArray = readFile(filePath); */

    const buffer = await readFile(filePath);
    const content = buffer.toString();
    const studentsArray = JSON.parse(content)
    res.send(studentsArray)
});

router.post("/", async (req, res) => {
    //const studentsArray = readFile()
    const buffer = await readFile(filePath);
    const content = buffer.toString();
    const studentsArray = JSON.parse(content)


    /* const emailCheck = studentsArray.find(student => {
        if (students)
    }) */
    const newStudent = { ...req.body, _id: studentsArray.length + 1, createdOn: new Date() };
    studentsArray.push(newStudent)
    await writeFile(filePath, JSON.stringify(studentsArray))
    res.status(201).send(`Student ${newStudent._id} was Created Successfully`)
    
});

router.put("/:id", async (req, res) => {
    

   // const studentsArray = readFile();

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
    res.send(mergedStudent)
} else {
    res.status(404).send("Student not found")
}
    
});

router.delete("/:id", async (req, res) => {
    // const studentsArray = readFile();

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
    }
});

module.exports = router;