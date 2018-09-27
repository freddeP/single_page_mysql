const Joi = require('joi');
 
module.exports = function (req,res,next)
{
const schema = Joi.object().keys({
    author: Joi.string().min(3).max(50).required(),
    todo: Joi.string().min(7).max(1000).required()
}).with('author', 'todo');
 
// Return result.
const result = Joi.validate({ author:req.body.author, todo:req.body.todo }, schema);

if(result.error === null) next();
else res.redirect("/?notVaildInput");


}