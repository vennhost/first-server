const express = require("express");
const server = express();
const router = require("./src/services/students/");
const projectRouter = require("./src/services/projects/");
const uploadRouter = require("./src/services/files/");
const mongoose = require("mongoose");
const studentSchema = require("./src/model/student")



const cloud = "mongodb+srv://venn:123sanya@venncluster-ygcdx.azure.mongodb.net/studentInfo?retryWrites=true&w=majority"
mongoose.connect(cloud, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
.then(db => console.log("DB Connected"), err => console.log("Error in DB connection"))

const port = 3001;

server.use(express.json())

server.use("/students", router)
server.use("/projects", projectRouter)
server.use("/files", uploadRouter)




server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});