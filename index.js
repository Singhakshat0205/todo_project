const express= require('express');
const server= express();
const mongoose= require('mongoose');
const todoRouter=  require('./routes/todo');

server.use(express.json());

server.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'URLs to trust of allow');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if ('OPTIONS' == req.method) {
    res.sendStatus(200);
    } else {
      next();
    }
  });
main().catch(err => console.log(err));

async function main() {
   await mongoose.connect('mongodb+srv://akshatsingh52002:Akshat123%40@cluster0.ewizvfm.mongodb.net/todoappdatabase?retryWrites=true&w=majority&appName=Cluster0');

}


server.use('/todos', todoRouter.router);



server.listen(8080);