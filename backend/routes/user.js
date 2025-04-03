import express from "express";
import {z} from "zod";
import { User } from "./../db.js"




const router = express.Router();

router.post("/signup", (req, res) => {
    const email = req.body.email;
    const password  = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const User = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    }
    
    //Validation using zod
    const userSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
        firstName: z.string().min(1),
        lastName: z.string().min(1)
    })
    const result =  userSchema.safeParse(User);
    if (!result.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: result.error.errors
        })
    }



    //Db call to save the user
    User.create(User);


    res.status(201).json({
        message: "User Signed up successfully"
    })
})


router.post("signin", (req, res) => {
    const email = req.body.email;
    const password  = req.body.password;

    

})


export default router;