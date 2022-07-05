const mongoose = require('mongoose')

const schema = mongoose.Schema({
    titre: {
        type: String,
    },
    type: { 
        type : String, 
    },
    description : String,
    image : String,
    categories : String,
    price :{
        type : Number,
    } 
})

module.exports = mongoose.model('camping', schema) // pour transformer le schéma en model 
