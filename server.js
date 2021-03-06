const express = require('express');
const app = express();
const PORT = process.env.PORT || 9999;

const dataRoute = require(__dirname+'/routes/data');
const posterRoute =require(__dirname+'/routes/poster');
const tokenRoute = require(__dirname+'/routes/tvdbtoken').route;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/',express.static(__dirname+'/public_static'));
app.use('/shows',dataRoute);
app.use('/shows/hello',posterRoute);
app.use('/shows/token',tokenRoute);

app.listen(PORT,()=>{
    console.log('server has started')
});