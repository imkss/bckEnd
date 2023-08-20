const express = require('express')

const Detail = require("../models/Detail")

const Slider = require("../models/Slider")
const Service = require('../models/Service')

const Faq = require('../models/Faq')

const routes = express.Router()

routes.get("/", async(req, res) => {
const details = await Detail.findOne({"_id" : "64dfd4fa25c22657c734dfb4"})
// console.log(details);

const slides = await Slider.find()
// console.log(slides);


    res.render("index", {
        details:details,
        slides: slides
    })
})

routes.get("/welcome", async (req, res) =>{
    const services = await Service.find()
    const details = await Detail.findOne({"_id" : "64dfd4fa25c22657c734dfb4"})
        res.render("welcome", {
            details:details,
            services: services            
        })
})

routes.get("/blogs-articles", async (req, res) =>{
    const details = await Detail.findOne({"_id" : "64dfd4fa25c22657c734dfb4"})
        res.render("blogs-articles", {
            details:details

        })
})

routes.get("/workshops", async (req, res) =>{
    const details = await Detail.findOne({"_id" : "64dfd4fa25c22657c734dfb4"})
        res.render("workshops", {
            details:details
            
        })
})

routes.get("/donate", async (req, res) =>{
    const details = await Detail.findOne({"_id" : "64dfd4fa25c22657c734dfb4"})
        res.render("donate", {
            details:details
            
        })
})

routes.get("/faq", async (req, res) =>{
    const faq = await Faq.find()
    const details = await Detail.findOne({"_id" : "64dfd4fa25c22657c734dfb4"})
        res.render("faq", {
            details:details,
            faq : faq            
        })
})

module.exports = routes