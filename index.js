const express= require('express');
const path= require('path');
require('dotenv').config();
const server= express();
const cors= require('cors');
const mongoose= require('mongoose');
const todoRouter=  require('./routes/todo');
const port= process.env.PORT;
server.use(cors());

const connectURL= process.env.MONGO_URL;
server.use(express.static(process.env.PUBLIC_DIR))
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
  //  await mongoose.connect('mongodb+srv://akshatsingh52002:Akshat123%40@cluster0.ewizvfm.mongodb.net/todoappdatabase?retryWrites=true&w=majority&appName=Cluster0');
  await mongoose.connect(connectURL);

}


server.use('/todos', todoRouter.router);



server.listen(port);


