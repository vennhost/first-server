const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator');


const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    repoUrl: {
        type: String,
        required: true,
        unique: true
    },
    liveUrl: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        required: false
    }

})

projectSchema.plugin(uniqueValidator);

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    country: {
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
    },
    projects: [projectSchema]


})

studentSchema.plugin(uniqueValidator);

const studentList = mongoose.model("student", studentSchema)

module.exports = studentList;