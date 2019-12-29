const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const path = require('path');
const db = require("./db");
const collection = "user";
// encryption
const bcrypt = require('bcrypt')
const saltRounds=10
module.exports = app;
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';

app.use(cookieParser());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/api/project', (req, res) => {
    console.log("TRTYU");
    db.getDB().collection("projects").find({}).toArray((err, documents) => {
        if (err) {
        console.log("ytrtyu");
            console.log(err);}
        else {
            console.log("REFER");
            console.log(documents);
            res.json(documents);
        }
    });
});

// app.put('/:id',(req,res)=>{
//     const todoID =req.params.id;
//     const userInput = req.body;

//     db.getDB().collection(collection).findOneAndUpdate({_id : db.getPrimarykey(todoID)},{$set : {todo : userInput.todo}},{returnOriginal : false},(err,result)=>{
//         if(err)
//             console.log(err);
//         else
//             res.json(result);
//     });
// });


// insert user in the user table *** sign up***
app.post('/api/Componentfrom', (req, res) => {

    bcrypt.hash(req.body.password, saltRounds, function(err,hash){
    var data = req.body
    console.log(data.firstname);
    var doc = [{
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: hash,
        joingroup: data.joingroup
    }];
    db.getDB().collection(collection).insertMany(doc, (err, result) => {
        if (err)
            console.log(err);
        else
            res.json('User Created');
            
    })
    });
});

// Sign in check user is present if yes then login
app.post('/api/Login', (req, res) => {
    console.log("ereeer1");
    var data = req.body
    // var doc = {
    //     email: data.email,
    //     password: data.password,
    // };
    console.log(data)
    db.getDB().collection(collection).findOne({email:data.email},function(err, result) {
        if (err)
            console.log(err);
        else{
            console.log(result.password)
            bcrypt.compare(req.body.password,result.password,function(err,result){
                if(result==true){
                    res.json(true)
                    console.log("LOGGED IN")
                } else{
                    console.log("incorrect password")
                    res.json("false")
                    console.log(result)
                }
            });
        }   
    });
});
app.post('/api/design_need', (req, res) => {
    var data = req.body
    console.log(data);
    var doc = [{
        statement: data.projectStatement,
        stakeholders: data.stakeholders,
        information: data.information,
        informationgathering: informationgathering,
        file: data.file,
        designBrief:data.designBrief,
        Review:data.Review
    }];
    db.getDB().collection("Design_need").insertMany(doc, (err, result) => {
        if (err)
            console.log(err);
        else
            res.json('data inserted');
            
    })
});
// app.post('/api/project_planning, (req, res) => {
//     var data = req.body
//     console.log(data);
//     var doc = [{
//         statement: data.projectStatement,
//         stakeholders: data.stakeholders,
//         information: data.information,
//         informationgathering: informationgathering,
//         file: data.file,
//         designBrief:data.designBrief,
//         Review:data.Review
//     }];
//     db.getDB().collection("Design_need").insertMany(doc, (err, result) => {
//         if (err)
//             console.log(err);
//         else
//             res.json('data inserted');
            
//     })
// });
// app.delete('/:id', (req, res) => {
//     const todoID = req.params.id;
//     console.log(todoID);
//     db.getDB().collection(collection).findOneAndDelete({ _id: db.getPrimarykey(todoID) }, (err, result) => {
//         if (err) {
//             console.log(err);
//             console.log(id);
//         }
//         else
//             res.json(result);
//         console.log("data inserted");
//     });
// });

db.connect((err) => {
    if (err) {
        console.log(err);
        console.log('unable to connect to database');
        process.exit(1);
    }
    else {
        app.listen(() => {
            console.log('connected to db, app listening on port')
        });
    }
})