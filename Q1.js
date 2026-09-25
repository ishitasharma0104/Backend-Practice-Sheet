const express=require("express");
const bcrypt=require("bcryptjs")

const app=express();
app.use(express.json());

const users=[
  {id:1,
    email:"ishita@gmail.com",
    password:(bcrypt.hashSync("12345",10))

  },
  {
    id:2,
    email:"sneha@gmail.com",
    password:(bcrypt.hashSync("abc123",10))
  }
]

app.post("/login",(req,res)=>{
  const {email,password}=req.body;
});