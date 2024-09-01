import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes.js";
import fileUpload from "express-fileupload";
import rateLimit  from 'express-rate-limit'
const app = express();
app.use(express.json());
dotenv.config();
app.use(fileUpload({useTempFiles : true}))
const Port = process.env.PORT;


const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 100,
  message: { message: 'Too many requests from this IP, please try again later' },
});

app.use('/api/', apiLimiter);

app.listen(Port, () => {
  console.log(`Example app listening on port ${Port}`);
});

app.use('/', router)

connectDB();
