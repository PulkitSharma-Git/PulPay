import express from "express";
import mainRouter from "./routes/index.js";
import cors from "cors";

app.use(cors());
app.use(express.json());



const app = express();

app.use("/api/v1", mainRouter);

const PORT = 3000;
app.listen(PORT , () => {
    console.log("Server is runnning on port" + PORT);
})