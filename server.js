const express = require("express");
const router = require("./src/services/students")


const server = express()

const port = 3001;

server.use("/students", router)

server.use(express.json())

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});