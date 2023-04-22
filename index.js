const express = require('express');
const app = express();
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
require('./Database/config');
const Cors = require('cors')
app.use(Cors())
const multer = require('multer');
const Name = require('./DataBase/NoteSchema');

/*
const upload = multer({

    storage:multer.diskStorage({ 
        destination:function(req,file,cb){
            cb(null,"uploads");
        },
        filename:function(req,file,cb){
            cb(null,file.originalname);
        }
    })
}).single("myPdf");

app.use('/upload',express.static('uploads'));



app.post('/upload',upload, async (req,res)=>{

    let data = new Name({
        image:req.file.path
    });
    let students = await data.save();
    res.send(students)

})


*/




//User Registration


app.post('/register',jsonParser,async(req,res)=>{

       
    if(req.body.name==="" || req.body.email==="" || req.body.password===""){
           res.send("Field Empty")
    }else{
       const user = await UserSchema.findOne({ email: req.body.email });

       if(user){
             res.send("Email already register")
       }else{
           const data = new UserSchema({
               name:req.body.name,
               email:req.body.email,
               password:req.body.password
           })
           let users = await data.save();
           users = users.toObject();
           delete users.password;
           res.send(users);
       }  
   }       
})


app.post('/login',jsonParser,async(req,res)=>{

   if(req.body.password && req.body.email){
       let user = await UserSchema.findOne(req.body).select('-password');

       if(user){
           res.send(user)
       }else{
          res.send('Please enter correct email and password')
      }
   }else{
        res.send("Please signup")
   }
})







app.listen(4000)