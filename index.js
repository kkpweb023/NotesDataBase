const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({

       origin: "https://kkpweb023.github.io" || "http://localhost:3000"
       
   
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

const port = process.env.PORT || 4000 ;
require('./DataBase/config');
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
const Info = require('./DataBase/InfoSchema')
const Students = require('./Database/StudentSchema');
const Users = require('./DataBase/UserSchema');



//const multer = require('multer');
//const Name = require('./DataBase/NoteSchema');

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
       const user = await Users.findOne({ email: req.body.email });

       if(user){
             res.send("Email already register")
       }else{
           const data = new Users({
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
       let user = await Users.findOne(req.body).select('-password');

       if(user){
           res.send(user)
       }else{
          res.send('Please enter correct email and password')
      }
   }else{
        res.send("Please signup")
   }
})



/*====================== Std_attendence ================== */


app.post('/attendence',jsonParser,async(req,res)=>{

    if(req.body.name==="" || req.body.subject==="" || req.body.remarks===""){
           res.send("Field Empty")
    }else{
           const data = new Info({
               name:req.body.name,
               subject:req.body.subject,
               remarks:req.body.remarks
           })
           let users = await data.save();
           res.send(users);
        
   }       
})


app.get('/info_list', async (req, res) => {

    const data = await Info.find({});

    if(data.length > 0){
        res.send(data)
    }else{
        res.send([]);
    }
})



//select or update color and size

app.put('/update-Product/:_id',jsonParser,async (req,res)=>{

    let result = await Info.updateOne(
         {_id:req.params._id},
         {$set:req.body}
    )
    res.send(result);
})



app.delete('/delete-info/:_id', async (req,res)=>{

    const user = await Info.findOne({_id:req.params._id});
    const data = await Info.deleteOne({_id:req.params._id});

   if(user){
         res.send(data);
   }else{
      res.send("Already deleted");
   }
})












/// ================ Class 5 students marks addd ====== ///////////////



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






app.listen(port, () => {
    console.log(`from port ${port}`)

})