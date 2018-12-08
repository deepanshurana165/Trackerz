const route = require('express').Router();
const rp = require('request-promise');

let token = '';

route.use((req,res,next)=>{
    if (!token){
        rp.post({url:'https://api.thetvdb.com/login',
                json: {
                    "apikey": "WP10NQ78SBL4TP1W",
                    "userkey": "6F2AH1A2X60L70B1",
                    "username": "jnm45120s6i"}
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
