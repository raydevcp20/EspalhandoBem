const express = require('express');
const app = express();

var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//import DAO's
const userDAO = require('./DAO/user-DAO');
const user = new userDAO();


app.post('/createUser', (req, res)=>{
    console.log(req.body);

    user.createUser(req.body).then( (result)=>{
        console.log(result);
    }).catch( (err)=>{
        console.log(err);
    });
});



app.listen(3000, () =>{
    console.log('Server Conectado.');
});
