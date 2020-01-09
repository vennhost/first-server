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

const projects = mongoose.model("project", projectSchema)

module.exports = projects;