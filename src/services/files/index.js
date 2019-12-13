const express = require("express");
const multer = require("multer");
const {readFile, writeFile} = require("fs-extra");
const { join } = require("path");

const router = express.Router()



const uploadURL = join(__dirname, "../../../public/img/students/");

console.log(uploadURL)

const upload = multer({});


router.post("/upload", upload.single("image"), async (req, res, next) => {
    const file = req.file
    await writeFile(join(uploadURL, file.originalname), file.buffer);
    console.log(req.file.originalname)
    res.send("File Upload Successful")
});




router.get("/:fileName/download", async (req, res, next) => {
    
    const { fileName } = req.params
    const buffer = await readFile(join(uploadURL, fileName));
        res.send(buffer)
    
});





module.exports = router;