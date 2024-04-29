import express from "express";
// import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { uploadChatBotDataToDatabase } from "./chatbot/vectorise.js";

/* CONFIGURATIONS */
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config({ path: ".env.development" });

// !MONGOOSE SETUP
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Started on Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

// uploadChatBotDataToDatabase();
