const express = require('express');
const musicianRouter = express.Router();
const { Musician } = require('../models/index')
const { check, validationResult } = require('express-validator')

musicianRouter.use(express.json());
musicianRouter.use(express.urlencoded({extended: true}));

musicianRouter.get("/", async (req, res) => {
    const musicians = await Musician.findAll();
    res.json(musicians);
});

musicianRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const myMusicians = await Musician.findByPk(id);
    res.json(myMusicians);
});

musicianRouter.post('/', [
    check('name').not().isEmpty(),
    check('instrument').not().isEmpty(),
    //check('name').isLength({ min: 2, max: 20 }),
    //check('instrument').isLength({ min: 2, max: 20 }),
], async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({errors: errors.array()})
    } else {
        const musician = await Musician.create(req.body);
        res.json(musician);
    }
});

musicianRouter.put('/:id', async (req,res) => {
    const id = req.params.id;
    await Musician.update(req.body, {where: {id: id}, returning: true, plain: true});
    const myMusicians = await Musician.findByPk(id);
    res.json(myMusicians);
});

musicianRouter.delete('/:id', async (req,res) => {
    const id = req.params.id;
    const deletedMus = await Musician.destroy({where: {id: id}});
    res.json(deletedMus);
});

module.exports = musicianRouter