const express = require("express");
const {v4: uuidv4} = require("uuid");
const validator = require("validator");

const app = express();
app.use(express.json());

const users = {};

app.get("/", (req, res) => {
    res.send("Welcome to the User API");
});

app.post("/users", (req, res)=>{

    const {name, email, age} = req.body;
    if(!name || !email || !age){
        return res.status(400).json({error:"Name, email, and age are required."})
    }

    if(!validator.isEmail(email)){
        return res.status(400).json({error:"Ivalid email format."});
    }

    const id = uuidv4();
    users[id] = {id, name, email, age};
    
    res.status(201).json(users[id]);
});

app.get("/users", (req, res)=>{
    res.json(Object.values(users));
});

app.get("/users/:id", (req, res)=>{
    const user = users[req.params.id];

    if(!user) return res.status(404).json({error:"User not found."});
    res.json(user);
});

app.put("/users/:id", (req, res)=>{
    const user = users[req.params.id];

    if (!user) return res.status(404).json({ error: "User not found." });

    const {name, email, age} = req.body;
    if(email && !validator.isEmail(email)){
        return res.status(400).json({error:"Invalid email format."});
    }

    users[req.params.id] = {
        ...user,
        name : name || user.name,
        email : email || user.email,
        age : age || user.age,
    };

    res.json(users[req.params.id]);
});

app.delete("/users/:id", (req,res)=>{
    const user = users[req.params.id];

    if(!user) return res.status(404).json({error: "User not found."});
    delete users[req.params.id];
    res.json({message: "User deleted Successfully"});
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
});






