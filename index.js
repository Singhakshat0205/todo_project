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

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://todo-project-ruddy-seven.vercel.app');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const allowedOrigins = ['https://todo-project-ruddy-seven.vercel.app', 'https://another-allowed-origin.com'];

server.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


const corsOptions = {
  origin: ['https://todo-project-ruddy-seven.vercel.app', 'https://another-allowed-origin.com'],
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

server.use(cors(corsOptions));



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