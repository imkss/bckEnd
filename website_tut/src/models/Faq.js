const mongoose = require("mongoose")

const Faq = mongoose.Schema({
    Q : String,
    A : String
});

module.exports = mongoose.model("faqs", Faq)