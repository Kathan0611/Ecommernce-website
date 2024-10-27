const express=require('express');
const connect=require('../backend/src/config/db');
const cors=require('cors')
const cookiesParser=require('cookie-parser');
const router=require('../backend/src/routers/userRouter');
require('dotenv').config()

const app=express();

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}));

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({extended:true}));
app.use(cookiesParser());

app.use('/api/v1',router);

connect().then(()=>{
    app.listen(5000,()=>{
        console.log('server runnnig on port 5000')
    })
})





