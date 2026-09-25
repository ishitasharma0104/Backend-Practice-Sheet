let express = require("express");
let bcrypt=require("bcryptjs");


const app=express();
app.use(express.json());


const users=[
  {
    id:1,
    email:"ishita@gmail",
    password: bcrypt.hashSync("12345",10)
  },
  {
    id:2,
    email:"sneha@gmail",
    password:bcrypt.hashSync("abc123",10)
  }
]

//login route
app.post("/login",async (req,res)=>{
  const {email,password}=req.body;

  //find user by email
  const user=users.find((u)=>u.email===email);
  if(!user){
    return res.status(401).json({
      message:"Invalid..."
    })
  }
  const isMatch=await bcrypt.compare(password,user.password);
  if(!isMatch){
    return res.status(401).json({
      message:"Invalid..."
    })
  }
  return res.status(200).json({
    message:"Success..",
    user:{
      id:user.id,
      email:user.email
    }
  })
})

app.listen(3000,()=>{
  console.log("Server");
})