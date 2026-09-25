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


app.post("/login",async(req,res)=>{
  const {email,password}=req.body;
  const user=users.find((u)=>u.email===email);
  if(!user){
    return res.status(401).json({
      message:"Invalid Password or email"
    });
  }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(401).json({
        message:"Invalid Password or email"
      })
    }
    return res.status(200).json({
      message:"Login Successfull",
      user:{
        id:user.id,
        email:user.email
      }
    })
  
});


app.listen(3000,()=>{
  console.log("Server...")
})