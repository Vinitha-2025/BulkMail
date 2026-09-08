const express=require("express")
const cors=require("cors")
const nodemailer=require("nodemailer")
const mongoose=require("mongoose")
const dns = require("dns");
require("dotenv").config()

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app=express()

app.use(cors())
app.use(express.json())

// let email=""
// let pass=""

// var emails="user@gmail.com"
// var passs="1234"

app.post("/signup",function(req,res){

const name=req.body.name
const emailid=req.body.emailid
const passid=req.body.passid

User.create({name:name, emailid:emailid, passid:passid})
  .then(function(){
    res.send(true)
  })
  .catch(function(err){
    console.log(err)
    res.send(false)
  })

})

app.post("/login",function(req,res){

    const emailid=req.body.emailid
    const passid=req.body.passid


    User.findOne({emailid:emailid, passid:passid})
  .then(function(user){
    if(user){
      console.log("Success")
      res.json({success:true, name:user.name, emailid:user.emailid})
    } else{
      console.log("Fail")
      res.json({success:false})
    }
  })
  .catch(function(err){
    console.log(err)
    res.json({success:false})
  })

})

app.get("/user/:emailid",function(req,res){
 
  User.findOne({emailid:req.params.emailid})
  .then(function(user){
    if(user){
      res.json({name:user.name, emailid:user.emailid})
    } else{
      res.status(404).json({error:"User not found"})
    }
  })
  .catch(function(err){
    console.log(err)
    res.status(500).json({error:"Failed to fetch user"})
  })
})

mongoose.connect(process.env.MONGO_URL);
// mongoose.connect("mongodb+srv://Jas:123@cluster0.agk9tmv.mongodb.net/passkey?appName=Cluster0")
.then(function(){
    console.log("DB Connected Successfully")
})
.catch(function(err){
    console.log("Failed to Connect",err)
})

const credential=mongoose.model("credential",{},"bulkmail")

const userSchema=new mongoose.Schema({
    name:String,
    emailid:{type:String, unique:true},
    passid:String
})
const User=mongoose.model("User", userSchema, "users")


const historySchema=new mongoose.Schema({
    subject:String,
    msg:String,
    emailTo:String,
    eamilList:[String],
    status:String,
    errorMessage:String,
    date:{type:Date, default:Date.now}
})

const EmailHistory=mongoose.model("EmailHistory", historySchema, "emailhistory")

app.post("/sendemail",function(req,res){

    var msg=req.body.msg
    var subject=req.body.subject
    var emailList=req.body.emailList
    var emailTo=req.body.emailTo

    credential.find()
.then(function(data){
    const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: data[0].toJSON().user,
    pass: data[0].toJSON().pass,
  },
})
  new Promise(async function(resolve,reject){
    try{
        if(emailList.length>0){
            for(var i=0;i<emailList.length;i++){
    await transporter.sendMail({
    from:"jashvica16@gmail.com",
    to:emailList[i],
    subject:subject,
    text:msg
   }
   )
   console.log("Email send to: "+emailList[i])
   } 
        } else{
            var recipients=emailTo.split(",")
            for(var i = 0; i < recipients.length; i++){
            await transporter.sendMail({
    from:"jashvica16@gmail.com",
    to:recipients[i],
    subject:subject,
    text:msg
   }
   ) 
   console.log("Email sent to: " + recipients)
    }   }
   resolve("Success")
    } 
    catch(error){
        reject("Failed")
    }
    })

    .then(function(){  
        EmailHistory.create({
            subject:subject,
            msg:msg,
            emailTo:emailTo,
            emailList:emailList,
            status:"sent"
        }).catch(function(err){
             console.log("History save failed:",err)
         })

        res.send(true)
    })
    .catch(function(error){
        EmailHistory.create({
            subject:subject,
            msg:msg,
            emailTo:emailTo,
            emailList:emailList,
            status:"failed",
            errorMessage: error && error.message ? error.message : String(error)
        }).catch(function(err){ console.log("History save failed:",err) })
 
        res.send(false)
    })
}) .catch(function(err){
    console.log(err)
    EmailHistory.create({
        subject:subject,
        msg:msg,
        emailTo:emailTo,
        emailList:emailList,
        status:"failed",
        errorMessage: err && err.message ? err.message : String(err)
    }).catch(function(historyErr){ console.log("History save failed:",historyErr) })
 
    res.send(false)

})
 
})
 
// NEW: return all sent history, most recent first
app.get("/emailhistory",function(req,res){
    EmailHistory.find()
    .sort({date:-1})
    .then(function(data){
        res.json(data)
    })
    .catch(function(err){
        console.log(err)
        res.status(500).json({error:"Failed to fetch history"})
    })
})

app.listen(3000,function(){
    console.log("Server Starting...")
})