import mongoose from "mongoose";
import express from "express";
import Signup from "../models/signup.model.js";

export const createNewId =  async (req,res) => {
    const signUp = req.body;
    if (!signUp.email || ! signUp.password || !signUp.phonenumber) {
        return res.status(400).json({success : false , message : "Enter the email and password and Phone Number"});
    }
    const user = await Signup.findOne({email: signUp.email});
    if (user) {
        return res.status(300).json({success:false , message : "User email already registered"});
    }
    const newId = new Signup(signUp);
    try {
        await newId.save();
        return res.status(200).json({success:true ,data : newId});
    } catch (error) {
        console.log("Error in creating Name "+error);
        return res.status(500).json({success:false , message:"Server Error"});
    }
}



