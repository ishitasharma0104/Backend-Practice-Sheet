let express=require("express");
let bcrypt=require("bcryptjs");

const app=express();
app.use(express.json());

const users=[
  {id:1,
   name:"Ishita",
   email:"ishita@gmail",
   password: bcrypt.hashSync("12345",10)
  },
  {
    id:2,
    name:"Sneha",
    email:"sneha@gmail.com",
    password:bcrypt.hashSync("sne123",10)
  }
]

app.post("/signup" , async(req,res)=>{
  const {name,email,password}=req.body;
  
  if(!name ||  !email || !password){
    return res.status(400).json({
      message:"All fields are required"
    });
  }
  const emailCheck=users.find((u)=>u.email===email);
  if(emailCheck){
    return res.status(409).json({
      message:"email already exists"
    })
  }
const hashedPass= await bcrypt.hash(password,10);

const newUser={
  id:users.length+1,
  name:name,
  email:email,
  password:hashedPass
};
users.push(newUser);
return res.status(201).json({
  msseage:"Success..."
})

  })

  app.listen(3001,()=>{
    console.log("Server..");
  })

