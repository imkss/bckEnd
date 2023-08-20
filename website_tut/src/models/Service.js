const mongoose = require('mongoose')

const Service = mongoose.Schema({
    icon: String,
    title: String,
    desc: String,
    link1: String,
    link2: String
})

module.exports = mongoose.model("services", Service)