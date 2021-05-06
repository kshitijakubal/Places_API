const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const placeRouter = require('./routers/places.route')

// mongodb connection
const mongoDB = "mongodb://127.0.0.1/places"
mongoose.connect(mongoDB, {
    useNewUrlParser:true
})

// get mongoose to use global promise
mongoose.Promise = global.Promise

const db = mongoose.connection;

// On successful connection
db.on('open',()=>{
    console.log("Mongodb successfully connected");
})
// error connecting database
db.on('Error',(err)=>{
    console.log("Error in Mongodb Connection"+err);
})

const app = express();

app.use(morgan('dev'))
// Parsing the form body
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/places',placeRouter)

// Uploading static files - images
app.use('/uploads',express.static('uploads'))

app.listen(8000,()=>{
    console.log(`App is up and running`);
})