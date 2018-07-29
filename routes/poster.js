const express = require('express');
const route = express.Router();
const rp = require('request-promise');

let image_prefix = 'http://thetvdb.com/banners/';
let info = {};
let url = '';

route.use((req,res,next)=>{
        const token = require('./tvdbtoken').token;
        let id =req.query.id;
        let options = {
            url: `https://api.thetvdb.com/series/${id}/images/query?keyType=fanart&resolution=1920x1080`,
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        };
        function callback(err,res,body) {
            if (err) console.log(err);
            info = JSON.parse(body);
        }
        rp.get(options, callback).then(function(){
            url = image_prefix+info.data["0"].fileName;
            console.log(url);
            res.send(url);
        });
});

module.exports = route;
