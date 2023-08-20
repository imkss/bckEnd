const mongoose = require("mongoose")

const Detail = mongoose.Schema({
    brandName : String,
    brandIconURL : String,
    links: [
        {
        label: String,
        url : String
    },
],
});

module.exports = mongoose.model("details", Detail)