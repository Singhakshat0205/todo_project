
const mongoose= require('mongoose');
const {Schema}= mongoose;


const todoSchema= new Schema({

    task:String,
    description:String,
    deadline:Date,
    tags:String

})


exports.Todo= mongoose.model('Todo', todoSchema);