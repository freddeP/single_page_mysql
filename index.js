const express = require("express");
const mysql = require('mysql');
const validate = require('./middleware/validate');
const authUser = require('./middleware/authUser');
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
//mysql - connection


// test user

const userEmail = "fp@fp.se";
let userPassword = "testing";

bcrypt.genSalt(16).then(function(value){
    let salt = value;
    
    bcrypt.hash(userPassword,salt,function(err,hash){
        console.log(hash);
        userPassword = hash;
    });


})


//end test user




var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'node'
});
con.connect(function(err){
    if(err) console.log(err);
    else console.log("connection success..");
 });


const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cookieParser());



app.get("/login", function(req,res){
    res.sendFile(__dirname+"/html/login.html");
});

app.post("/login", function(req,res){
   
    console.log(req.body.email);
    console.log(req.body.password);

    if(req.body.email === userEmail)
    {
        // user exists check password
        bcrypt.compare(req.body.password,userPassword,function(err,success){
            if(success)
            {
                console.log("user logged in");
            }
        });


    }


});





app.post("/createTodo",validate, function(req,res){
    // first validate and sanitize the body...
    // later...
    insertTodo(req.body);
    res.redirect("/?redirected");
});

app.get("/getAllTodos", function(req,res){

        const q2 = "SELECT * FROM todo";
        con.query(q2, function(err, result){
        res.send(JSON.stringify(result));

    });

});


app.get("/deletePost",authUser,function(req,res){

   const id = parseInt(req.query.id);
   let q = "DELETE FROM todo WHERE id = ?";
   con.query(q,id,function(err, result){
       if(err) console.log(err);
       else console.log(result);
       res.redirect("/?post:"+id+"deleted");
   });
});


app.post("/updateTodo",validate,function(req,res){

    let q = "UPDATE todo SET author = ?, post = ? WHERE id = ?";
    con.query(q,[req.body.author,req.body.todo,req.body.id], function(err, result){
        if(err) console.log(err);
        else console.log(result);
        res.redirect("/?updated");
    });

})


app.listen(3000, function (){
    console.log("app is running on port 3000");
});



function insertTodo(input){

    const post = input.todo;
    const author = input.author;
    const q1 = "INSERT INTO todo (post,author) VALUES (?)"

    const inputArr = [post, author];

    con.query(q1,[inputArr],function(err, result){ 
        if (err) console.log(err);
        else console.log(result);
     }); 

}

