const express = require("express");
const server = express();
const router = require("./src/services/students/")
const projectRouter = require("./src/services/projects/")




const port = 3001;

server.use(express.json())

server.use("/students", router)
server.use("/projects", projectRouter)




server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});