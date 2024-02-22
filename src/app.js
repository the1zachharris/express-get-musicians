const express = require("express");
const app = express();
const musicianRouter = require('../routes/musicians')

// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

app.use('/musicians', musicianRouter);

module.exports = app;