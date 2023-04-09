const express = require('express');
const nvModel = require('../model/nhanvien');
const app = express();

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
    
    if(req.body.id==''){
       addRecord(req,res)
    }else{
        updateRecord(req,res)
    }
    
   
});
app.get('/edit/:id', (req,res)=>{
    nvModel.findById(req.params.id)
    .then(data => {
        res.render('add', {nv: data.toJSON()})
    })
    .catch(err => {
        // Xử lý lỗi tại đây
    });
                 
   
   
})
function addRecord (req,res){
    const u = new nvModel(req.body);
    try{
         u.save();
        res.render('add');
        res.redirect('/nv')
    }catch(error){
        res.status(500).send(error);
    }
}
function updateRecord(req,res){
    nvModel.findOneAndUpdate({_id:req.body.id}, req.body, {new:true})
    .then(data => {
        res.redirect('/nv')
    })
    .catch(err => {
        console.log(err);
        res.render('add');
    });
}

app.get('/delete/:id',async(req,res)=>{
    try {
        const user = await nvModel.findByIdAndDelete(req.params.id,req.body);
        if(!user) res.status(404).send("no item found")
        else{
            res.redirect('/nv')
        }
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports =app;