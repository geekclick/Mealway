const express=require('express');
const User=require('../models/user-model');

const home = (req,res)=>{
try {
    res.status(200).send("This is Home");
} catch (error) {
    res.status(error.status)
    console.error(error);
}
}

const register = async (req, res)=>{
try {
    const {fname,lname,email,password}=req.body;
    const userExits = await User.findOne({email});

    if(userExits) {
        res.status(400).json({msg:"Email already registered"});
        console.log("User is already registered");
        return;
    }

    const data = await User.create({fname,lname,email,password});
    const token = await data.generateToken();
    
    res.status(201).json({
        msg:"User created successfully",
        token,
        userId:data._id.toString(),
    });
    console.log(data);
} catch (error) {
    res.status(error.status)
    console.error(error);
}
}

const login = async (req, res) => {
    try {
        const {email,password}=req.body;
        const userExits=await User.findOne({email});

        if(!userExits){
            console.log("Inavlid ");
        }

        if(userExits && userExits.comparePassword(req.body.password)){
            res.status(200).json({
                msg:"Login successful",
                token:await userExits.generateToken(),
                userId:userExits._id.toString(),
            })
        }

        else{
            res.status(401).send({msg:"Invalid email or password"})
        }
    } catch (error) {
        console.log("Error in login  " + error);
    }
}

module.exports= {home,register,login}