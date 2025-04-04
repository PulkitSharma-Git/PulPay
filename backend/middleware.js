import { JWT_SECRET } from "./config";
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message: "Token not found"
        });
    }

    const token = authHeader.spilt('')[1];

    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if(decoded.userId) {
            req.userId = decoded.userId
            next();
        }else {
            res.status(403).json({
                message: "UserId not found in token"
            })
        }
    }catch(e) {
        res.status(403).json({
            message: "Token could not be obtained"
        })
    }
}

export default authMiddleware;