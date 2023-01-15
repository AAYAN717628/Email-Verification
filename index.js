// Main File //
const express = require('express')
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const app = express()
const { QuickDB } = require("quick.db");
const db = new QuickDB();
var cors = require('cors');
const genCode = require('./src/functions/numberGen');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const corsOptions ={
   origin: true, 
   credentials:true,            
   optionSuccessStatus:200,
}

app.use(express.json())
app.use(cors(corsOptions))
// Routes //

app.post('/',async(req,res) => {
    const {email} = req.body
    console.log(email)
   const abc =  genCode()
   if(abc){
   await db.set(`otp_${email}`,abc);
 
   // Here you can use node mailer // 
//
    res.status(200).json({
        code: abc,
        status: 'success'
    })
   }
})

app.post('/verify',async(req,res) => {
    try {
    const {email,code} = req.body
    console.log(email,code)
    const data = await db.get(`otp_${email}`);
    console.log(data)
    if(data){
        if(data.toString() === code){
            res.status(200).json({
                verification: true,
                email: email,
                otp: data,
                message: 'You have been verified'
            })
            await db.delete(`otp_${email}`)
        }
    } else if(!data){
        res.status(404).json({
            verification: false,
            email: email,
            otp: 'Not Found',
            message: 'It seems like that we never sent any otp on this mail'
        })
    } 
     if(data.toString() !== code){
        // 98680
        res.status(200).json({
            verification: false,
            email: email,
            otp: 'Wrong Otp',
            message: 'Wrong Otp Provided'
        })
    }
} catch(err){
    res.status(400).json({
        status: false,
        message: 'Something Went Wrong'
    })
}
})
app.listen(8000,() => {
    console.log('API IS ONLINE')
})


// by aayan //
