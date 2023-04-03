
var express = require('express');
var expressHbs= require('express-handlebars');
const app = express();
var mongoose =require('mongoose');
var url = "mongodb+srv://duongddtph24297:duongto12@cluster0.teophxq.mongodb.net/test?retryWrites=true&w=majority"



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



const nvModel = require('./NhanVienModel');



app.get("/",(req,res)=>{
    nvModel.find({}).then(nhanviens=>{
        res.render('index',{
            nhanviens:nhanviens.map(nv=>nv.toJSON())
        });
    })
});


    
app.get('/them',function(req,res){
    res.render('add')
})

app.post('/add', async(req,res)=>{
    const u = new nvModel(req.body);
    try{
        await u.save();
        res.render('add');
        res.redirect('/')
      
    }catch(error){
        res.status(500).send(error);
    }
   
});
app.get('/edit/:id',(req,res)=>{
   
})

app.get('/delete/:id',async(req,res)=>{
    try {
        const user = await nvModel.findByIdAndDelete(req.params.id,req.body);
        if(!user) res.status(404).send("no item found")
        else{
            res.redirect('/')
        }
    } catch (error) {
        res.status(500).send(error)
    }
})



