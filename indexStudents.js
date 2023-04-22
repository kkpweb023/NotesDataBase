const express = require('express');
const app = express();
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
require('./Database/config');
const cors = require('cors');
app.use(cors());
const Students = require('./Database/StudentSchema');

app.post('/add_Students',jsonParser, async (req,res)=>{

    let data = new Students(req.body);
    let students = await data.save();
    res.send(students)

})


app.get('/list-students',async (req,res)=>{

    let data = await Students.find({});

    if(data.length > 0){
        res.send(data)
    }else{
        res.send([]);
    }
 
})

app.delete('/delete-student/:_id',async (req,res)=>{
    
    let data = await Students.deleteOne({_id:req.params._id});
    res.send(data);
     
})





app.listen(2000);