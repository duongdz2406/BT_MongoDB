
var express = require('express');
var expressHbs= require('express-handlebars');
const app = express();
var mongoose =require('mongoose');
var url = "mongodb+srv://duongddtph24297:duongto12@cluster0.teophxq.mongodb.net/test?retryWrites=true&w=majority"
var nvController = require('./controller/nvController')


const bodyParser = require('body-parser')


app.use(express.json());

mongoose.connect(url,{useUnifiedTopology:true,useNewUrlParser:true})
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('css'));

app.listen(8080,()=>{
    console.log("Sever is running")
});

app.engine('.hbs',expressHbs.engine({extname:'.hbs',defaultLayout:'main' }));
app.set('view engine',".hbs");



const nvModel = require('./model/nhanvien');




app.use('/nv',nvController);



