const express = require("express");
const mysql = require('mysql');
const validate = require('./middleware/validate');
const authUser = require('./middleware/authUser');
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// csrf-cookie
const csrf = "asöjldfkjasödflkasdjöflkjasdf2#";


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
app.use(cookieParser());



app.get("/createUser", function(req,res){
    res.sendFile(__dirname+"/html/createUser.html");
});

app.post("/createUser", function(req,res){
  
    const userEmail = req.body.email;
    let userPassword = req.body.password;

    bcrypt.genSalt(12).then(function(value){
    let salt = value;
        
        bcrypt.hash(userPassword,salt,function(err,hash){
            console.log(hash);
            userPassword = hash;
            // Nu är lösenordet hashat och vi skall spara till DB.
            let q = "INSERT INTO users (email, password) VALUES (?,?)";
            con.query(q,[userEmail,userPassword],function(err,result){
                if(err) console.log(err);
                else console.log(result); 
                res.redirect("/?user_created");   
            }); // end query
        });// end hash
    }); //end gen salt
});  // end post createUser

app.get("/login", function(req,res){
    res.sendFile(__dirname+"/html/login.html");
});

app.post("/login", function(req,res){
   
    console.log(req.body.email);
    console.log(req.body.password);

    let userEmail = req.body.email;
    let userPassword = req.body.password;
    // här skall vi sanera html och validera inputs

    // hitta användare i DB.
    let q = "SELECT id,email,password,admin FROM users WHERE email = ?";
    console.log(q);
    con.query(q,[userEmail],function(err,result){
        console.log(err);
        console.log(result);
     
        if(result.length === 1)
        {

                 // user exists check password
        bcrypt.compare(userPassword,result[0].password,function(err,success){
            if(success)
            {

                // skapa token med jwt

                const tempId =  result[0].id;
                const token = jwt.sign(
                    {id:tempId, admin:result[0].admin},
                    "minhemlighet",{expiresIn : 60*10});
                console.log(token);

                // skapa två cookies
                
                   //en cookie med vår token
                    res.cookie("jwt-token",token,{
                        httpOnly : true,
                        secure : false, // obs skall vara true för https
                        sameSite : true
                    });
                     //en cookie som clienten skall manipulera
                    res.cookie("csrf", "123",
                    {   httpOnly: false, 
                        sameSite:true, 
                        secure:false
                    });

                console.log("user logged in");
                res.redirect("/?csrf="+csrf);
            }
        });


        }

    });



   

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


