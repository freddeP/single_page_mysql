// mysql connection
var mysql      = require('mysql');
var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'node'
});
 
con.connect(function(err){

  if(err) throw err;
  else{
    console.log('connection success');
  }

});
/* var meta = {};
meta.author = "Fredde P";
meta.tags = ["express","web","php","node"];
meta = JSON.stringify(meta);
var sql = "INSERT INTO todo (post , meta) VALUES (?)";
var insert = ["my third post", meta];
con.query(sql,[insert], function (err, result){
    console.log(err);

}); */

con.query("SELECT * FROM todo",function(err, result){

    console.log(result);
    
        result.forEach(element => {
            console.log(element.id," post: ",element.post);
          

                var tmpMeta = JSON.parse(element.meta) || null;
                if(tmpMeta != null)
                {
                    console.log("tmpMeta: " ,tmpMeta.tags);
                    tmpMeta.tags.forEach(tag =>{
                        console.log(tag + " - - - ");
                    });
                }


        });
        
    });

