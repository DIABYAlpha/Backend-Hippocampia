//------------------ la création de l'application ( API manipulant des reservations) ------------//

// la declaration des variables se fait toujours au dessus ici 
const cors = require('cors');
require("dotenv").config();
const express = require("express")
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(cors())
//-----------------Mise en place de la REST API--------------------//
const Campings = require('./campings') // importation du modéle 
app.use(bodyParser.json())  // il faut déclarer avant les methodes 


//------------------------Mise en place de la REST API ----------------------------------//
const { API_PORT } = process.env;
const port = process.env.PORT  || API_PORT //4850;

mongoose.connect(
    process.env.DB_URL || "mongodb+srv://alpha:18amadou@cluster0.99su1.mongodb.net/campings?retryWrites=true&w=majority"
    , err => {
        if (err) throw 'erreur est : ', err;
        console.log('connected to MongoDB', API_PORT);
    });

//------------------ la création du serveur web-----------------------------//

app.listen(port, () => {
    console.log('le serveur fonctivvvonne');
}) 

//------------------------la création des routes --------------------------------------//
//-----------------------------Methode (Routes) Get----------------------------------------------//

app.delete('/campings/:id', async (req, res) => {
    const id = req.params.id
    console.log('id est : ', id);
    const suppr = await Campings.deleteOne({ _id: id })
    res.json(suppr)

})

// //-----------------------------Methode (Route) Post----------------------------------------------//
app.post('/campings', async (req, res) => {
    const nouveau_camping = new Campings({ // création d'un objet representant notre model 
        titre: req.body.titre,
        type: req.body.type,
        description: req.body.description,
        categories: req.body.categories,
        image: req.body.image,
        price: req.body.price
    })

    await nouveau_camping.save() // Sauvegarde asynchrone du nouveau camping
    res.json(nouveau_camping)
})

app.get('/campings', async (req, res) => {
    const campings = await Campings.find() // on recupére tous les campings
    res.json(campings)
});
// //                         Get by id                              ----------------------------------------//
// app.get('/campings/:id', async (req, res) => {
//     const id = req.params.id                          
//     const camping = await Campings.findOne({ _id: id })    // oN recupére le camping grâce à l'id 
//     res.json(camping)
// })

// //------------------------------------Methode Get par catégories ----------------------------------------//

// app.get('/campingsByCategories', async (req, res) => {

//     const categorierequest = req.query.categories  //Une constante que je récup dans ma requête(req) grâce au query 
//     //categoriesquest est une variable quelconque que je choisi 
//     // Je fais une recherche find by (par critere) dans mon objet 
//     const findbycat = await Campings.find({
//         categorie: categorierequest
//     })
//     // J'envoie la reponse qui figure dans xtest-POSTMAN : http://localhost:3000/campingsByCategories?categories=Policier 
//     res.json(findbycat)
// })

// //---------------------------------Methode Get par min et max -------------------//
// // properties ? min = 0 & max=10000

// app.get('/campingsByPrice', async (req, res) => {

//     const min = req.query.min;
//     const max = req.query.max;
//     console.log(min, max);

//     const findbyprice = await Campings.find({
//         price: { $gte: min, $lte: max }        // gte >= ou lte : <=
//     });
//     res.json(findbyprice);

// });

// //----------------------------Methode Get par mots clés------------------------------------------//
// app.get('/campingsByKeyword', async (req, res) => {  // je app.get ('/je choisis le nom de route ou le type de recherche)

//     const FindKeyWord = req.query.motCles

//     const keyWord = await Campings.find({
//     $or: [                                       // or permet de pouvoir utiliser plusieurs prop du model ( titre, auteur, genre)
//         { 'titre': new RegExp(FindKeyWord, 'i')},         //  Un objet RegExp est utilisé pour étudier les correspondances
//             { 'type': new RegExp(FindKeyWord, 'i')},    //  d'un texte avec un motif donné. Il évite de taper le mot en 
//             { 'categories': new RegExp(FindKeyWord, 'i')},     // entier et peux trouver à partir des suggestions.
//     ]
//     })

//     res.json(keyWord)

// });


// //----------------------------Methode Delete -------------------------------------------------//



// //------------------------------La méthode PUT- (put pour que ce soit identique à mon front end) -------------------------------------------//

// app.put("/campings/:id", async (req, res) => {
//     const id = req.params.id
//     const camping = await Campings.findOne({ _id: id })

//     // On recupére les valeurs potentiellement modifiées 

//     const titre = req.body.titre; 
//     const type = req.body.type;
//     const description = req.body.description;
//     const categories = req.body.categories;
//     const image = req.body.image;
//     const price = req.body.price

//     if (titre) {
//         camping.titre = titre
//     }
//     if (type) {
//         camping.type = type
//     }
//     if (description) {
//         camping.description = description
//     }
//     if (categories) {
//         camping.categories = categories
//     }
//     if (image) {
//         camping.image = image
//     }
//     if (price) {
//         camping.price = price
//     }

//     await camping.save() // On sauvegarde les modifications 
//     res.json(camping)

// })
