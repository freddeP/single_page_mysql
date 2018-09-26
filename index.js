const express = require("express");
const mysql = require('mysql');

//mysql - connection
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


app.post("/createTodo", function(req,res){
    // first validate and sanitize the body...
    // later...
    insertTodo(req.body.todo);
    res.redirect("/?redirected");
});

app.get("/getAllTodos", function(req,res){

    const q2 = "SELECT * FROM todo";
    con.query(q2, function(err, result){
        res.send(JSON.stringify(result));
    });

});


app.listen(3000, function (){
    console.log("app is running on port 3000");
});



function insertTodo(todo){

    const q1 = "INSERT INTO todo (post) VALUES (?)"

    con.query(q1,todo,function(err, result){ 
        if (err) console.log(err);
        else console.log(result);
     }); 

}

