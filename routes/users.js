import express from 'express';
import { UserModel } from '../models/Users';

const router = express.Router();

router.post('/signup', async(req,res) => {
    const {name, email, mobileNo} = req.body;

    if(!name || !email || !mobileNo){
        return res.status(400).json({message: "All fields are required"});
    }

    const userExists = await UserModel.findOne({mobileNo});

    if(userExists){
        return res.status(400).json({message: "User already exists"});
    }

    const user = await UserModel.create({name, email, mobileNo});

    if(user){
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            mobileNo: user.mobileNo
        });
    } else {
        return res.status(400).json({message: "Invalid user data"});
    }
})