import express from "express";
import {z} from "zod";
import { User } from "./../db.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

const router = express.Router();

const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().min(1),
    lastName: z.string().min(1)
})

router.post("/signup", async (req, res) => {

    //Validation using zod
    const result =  userSchema.safeParse(User);
    if (!result.success) {
        return res.status(411).json({
            message: "Invalid Inputs"
        })
    }
    
    const existingUser = await User.findOne({
        email: req.body.email
    });

    if(existingUser) {
        res.status(411).json({
            message: "User already exist. Please Sign Up"
        })
    }

    const User = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    }


    //Db call to save the user
    const user = User.create(User);

    const token = jwt.sign({
        userId: user._id
    }, JWT_SECRET)


    res.status(201).json({
        message: "User created Sccessfully",
        token: token

    })
})


router.post("signin", (req, res) => {
    const email = req.body.email;
    const password  = req.body.password;




})


export default router;