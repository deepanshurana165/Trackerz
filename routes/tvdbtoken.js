const route = require('express').Router();
const rp = require('request-promise');

let token = '';

route.use((req,res,next)=>{
    if (!token){
        rp.post({url:'https://api.thetvdb.com/login',
                json: {
                    "apikey": "0178C5GV2NTOU4W8",
                    "userkey": "NW4CBMTDRZR8NUE8",
                    "username": "deepanshuranahero7jc"}
            },
            function(err,httpResponse,body){
                if (err) console.log(err);
                token = body.token;
                console.log(token);
                exports.token = token;
            }).then(res.send('token Generated'));
    } else{
        console.log('token Not required');
        res.send('token not Generated')
    }

});

exports.route = route;
