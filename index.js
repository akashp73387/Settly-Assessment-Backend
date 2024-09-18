import express from "express";
import cors from "cors";
import connectDB from "./Database/config.js";
import router from "./Router/userRouter.js";

const app= express();

app.use(express.json());
app.use(cors({
  origin: "*",
  credentials: true,  
}));

 connectDB();

app.get('/', (req, res) => {
    res.send('API running');
})

app.use('/api/users',router )
app.listen(5000, () => console.log("Server is running....."));

