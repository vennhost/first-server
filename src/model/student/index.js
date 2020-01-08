const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    createdDate: {
        type: Date,
        required: false
    }

})

studentSchema.plugin(uniqueValidator);

const studentList = mongoose.model("student", studentSchema)

module.exports = studentList;