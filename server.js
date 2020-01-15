const express = require("express");
const server = express();
const db = require("./db")
const dotenv = require("dotenv");
dotenv.config();
const router = require("./src/services/students/");
const projectRouter = require("./src/services/projects/");
const uploadRouter = require("./src/services/files/");
const mongoose = require("mongoose");
const studentSchema = require("./src/model/student")
const projectSchema = require("./src/model/project")



const cloud = "mongodb+srv://venn:123sanya@venncluster-ygcdx.azure.mongodb.net/studentInfo?retryWrites=true&w=majority"
mongoose.connect(cloud, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
.then(db => console.log("DB Connected"), err => console.log("Error in DB connection"))



server.use(express.json())

server.use("/students", router)
server.use("/projects", projectRouter)
server.use("/files", uploadRouter)




server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});