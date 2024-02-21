const express = require("express");
const app = express();
const { Musician } = require("../models/index")

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//TODO: Create a GET /musicians route to return all musicians 


app.get("/musicians", async (req, res) => {
    const musicians = await Musician.findAll();
    res.json(musicians);
});

app.get("/musicians/:id", async (req, res) => {
    const id = req.params.id;
    const myMusicians = await Musician.findByPk(id);
    res.json(myMusicians);
});

app.post('/musicians', async (req,res) => {
    const musician = await Musician.create(req.body);
    res.json(musician);
});

app.put('/musicians/:id', async (req,res) => {
    const id = req.params.id;
    await Musician.update(req.body, {where: {id: id}, returning: true, plain: true});
    const myMusicians = await Musician.findByPk(id);
    res.json(myMusicians);
});

app.delete('/musicians/:id', async (req,res) => {
    const id = req.params.id;
    const deletedMus = await Musician.destroy({where: {id: id}});
    res.json(deletedMus);
});

module.exports = app;