import express from "express";
import {z} from "zod";
import { UserModel } from "./../db.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import authMiddleware from "../middleware.js";

const router = express.Router();

const signUpBody = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().min(1),
    lastName: z.string().min(1)
})

router.post("/signup", async (req, res) => {

    //Validation using zod
    const result =  signUpBody.safeParse(req.body);
    if (!result.success) {
        return res.status(411).json({
            message: "Invalid Inputs"
        })
    }
    
    const existingUser = await UserModel.findOne({
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
    const user = UserModel.create(User);

    const token = jwt.sign({
        userId: user._id
    }, JWT_SECRET)


    res.status(201).json({
        message: "User created Sccessfully",
        token: token

    })
})

const signInBody = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})


router.post("/signin", async (req, res) => {
    const result  = signInBody.safeParse(req.body);

    if(!result.success) {
        res.status(411).json({
            message: "Failed at Validation"
        })
    }

    const user = await UserModel.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if(user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)

        res.status(200).json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while Logging in"
    })
})


const updateBody = z.object({
    password: z.string().z.min(6).optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()

})

router.put("/", authMiddleware, async (req, res) => {
    const body = updateBody.safeParse(req.body);

    if(!body) {
        res.status(411).json({
            message: "Failed at Zod Validation"
        })
    }

    await UserModel.updateOne({
        _id: req.userId
    }, req.body)

    res.json({
        message: "Updated Successfully"
    })
})

router.get("/bulk", authMiddleware, (req, res) => {
    
    

})


export default router;