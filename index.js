const express = require("express");


const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.post("/createTodo", function(req,res){
    console.log(req.body);
    res.redirect("/");

});


app.listen(3000, function (){
    console.log("app is running on port 3000");
});
