const mongoose = require('mongoose')

const schema = mongoose.Schema({
    titre: {
        type: String,
    },
    type: { 
        type : String, 
    },
    categories : String,
    description : String,
    image : String,
    price :{
        type : Number,
    } 
})

module.exports = mongoose.model('camping', schema) // pour transformer le schéma en model 
