import express from 'express';
import userRouter from './user';

const router = express.Router();

router.get("/user", userRouter);


export default router;