const express = require("express");
const server = express();
const router = require("./src/services/students/")




const port = 3001;

server.use(express.json())

server.use("/students", router)



server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});