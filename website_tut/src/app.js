const express = require("express")
const app = express()
const mongoose = require('mongoose')

const Detail = require("./models/Detail")
const Slider = require("./models/Slider")
const Service = require("./models/Service")
const FAQ = require("./models/Faq")

// templete engine
const hbs = require('hbs')
app.set('view engine', 'hbs')
hbs.registerPartials("views/partials")

// Access public resourses
app.set("views", "views")
app.use('/static',express.static("public"))

require("dotenv").config();

const routes = require('./routes/main')

app.use('', routes)


/* DB CONNECTION  */

mongoose.connect(process.env.DB_CONNECTION_URL)

// Detail.create({
//     brandName : "ColgStack",
//     brandIconURL : "https://www.colgstack.in/assets/images/logo.png",
//     links: [
//         {
//             label : "Home",
//             url:"/"
//         },
//         {
//             label : "Courses",
//             url:"/courses"
//         },
//         {
//             label : "Contests",
//             url:"/contests"
//         },
//         {
//             label : "About",
//             url:"/about"
//         },
//         {
//             label : "Contact Us",
//             url:"/contact-us"
//         },
//     ]
// })

// Slider.create([
//     {
//         title : "Text 1",
//         subTitle: "Subtitle 1",
//         imgUrl : "/static/images/0.jpg",
//         class : "Active"
//     },
//     {
//         title : "Text 2",
//         subTitle: "Subtitle 2",
//         imgUrl : "/static/images/1.jpg"
//     },
//     {
//         title : "Text 3",
//         subTitle: "Subtitle 3",
//         imgUrl : "/static/images/2.jpg"
//     },
// ])

// Service.create([
//     {
//         icon:"fa-people-group",
//         title:"Service Group",
//         desc:"Come together to share experiences, advice, and emotional support related to a common challenge or issue.",
//         link1:"/",
//         link2:"/"
//     },
//     {
//         icon:"fa-chess-knight",
//         title:"Coping Strategies",
//         desc:"Techniques and actions individuals use to manage and navigate through challenging or stressful situations.",
//         link1:"/",
//         link2:"/"
//     },
//     {
//         icon:"fa-spa",
//         title:"Mindfulness Techniques",
//         desc:"Mindfulness techniques involve focusing one's awareness on the present moment, accepting it without judgment, and fostering a heightened sense of self-awareness and tranquility.",
//         link1:"/",
//         link2:"/"
//     },
//     {
//         icon:"fa-heart-circle-bolt",
//         title:"Mental Health Education",
//         desc:"Providing knowledge and awareness about various aspects of mental well-being, mental illnesses, and seeking help, with the aim of reducing stigma and promoting overall psychological wellness.",
//         link1:"/",
//         link2:"/"
//     },
//     {
//         icon:"fa-handshake-angle",
//         title:"Partners & Supporters",
//         desc:"Provide assistance to further the goals and initiatives of a particular cause or endeavor.",
//         link1:"/",
//         link2:"/"
//     },
//     {
//         icon:"fa-medrt",
//         title:"Find a Therapist",
//         desc:"Locating and connecting with a mental health professional who can provide counseling and support for individuals dealing with emotional or psychological challenges.",
//         link1:"/",
//         link2:"/"
//     }
// ])

// FAQ.create([
// {
//     Q : "Q: Can I recover from depression?",
//     A : "A: Yes, many people recover from depression with the right treatment, support, and self-care strategies. Recovery is a journey, and there is hope for improvement."
// },
// {
//     Q : "Q: What treatment options are available for depression?",
//     A : "A: Treatment options include therapy (such as cognitive-behavioral therapy), medication, lifestyle changes, and self-care practices. The best approach varies from person to person."
// },
// {
//     Q : "Q: Are there online therapy options available?",
//     A : "A: Yes, online therapy platforms and telehealth services provide convenient access to therapy sessions with licensed professionals from the comfort of your own space."
// },
// {
//     Q : "Q: Are support groups helpful for depression?",
//     A : "A: Support groups can be very helpful, as they offer a sense of community and understanding from others who are facing similar challenges."
// },
// {
//     Q : "Q: How can I support a friend or family member with depression?",
//     A : "A: Listen without judgment, offer your presence, and encourage them to seek professional help. Remember, your role is to be supportive, not a substitute for a mental health professional."
// },
// {
//     Q : "Q: What's the difference between sadness and depression?",
//     A : "A: Sadness is a normal emotion that comes and goes in response to life events, while depression involves persistent feelings of hopelessness, worthlessness, and other symptoms that interfere with daily life."
// }
// ])

app.listen(process.env.PORT | 5556, () =>{
    console.log("Server Started");
})