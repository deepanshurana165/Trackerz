const express = require('express');
const route = express.Router();
const path = require('path');

route.get('/', (req,res,next)=>{
    let reqPath = path.join(__dirname, '../public_static/shows.html');
    res.sendFile(reqPath);
});

module.exports = route;