
const model= require('../model/todo');
const Todo= model.Todo;



exports.getAllTodos= async(req,res)=>{
      
 const alltodos= await Todo.find();
 res.json(alltodos);
    
}

exports.getTodo=async(req,res)=>{
    
    const id= req.params.id;
    const todo = await Todo.findById(id);

    res.status(200).json(todo);
}


exports.AddTodo= async (req, res)=>{

    const todo= new Todo();

    todo.task= req.body.task;
   
    todo.description= req.body.description;
    todo.deadline= req.body.deadline;
    todo.tags= req.body.tags;

    todo.save();

    res.status(201).json(todo);
}



exports.replaceTodo = async (req, res)=>{


    const id= req.params.id;
    try{
        const doc= await Todo.findOneAndReplace({_id:id},req.body)
        res.status(201).json(doc);
      }
      catch(err){
        console.log(err);
        res.status(400).json(err);
      }


}


exports.updateTodo= async( req, res)=>{

    const id= req.params.id;
    try{
        const doc= await Todo.findOneAndUpdate({_id:id},req.body, {new:true})
        res.status(201).json(doc);
      }
      catch(err){
        console.log(err);
        res.status(400).json(err);
      }
}

exports.removeTodo =async (req,res)=>{

    const id= req.params.id;
    try{
        const doc= await Todo.findByIdAndDelete(id);
        res.status(200).json(doc);
      }
      catch(err){
        console.log(err);
        res.status(400).json(err);
      }
}


