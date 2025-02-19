import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoute.js";
import cors from "cors";
import path from 'path';

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;
const __dirname = path.resolve();

app.use("/api", route);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("DB connected successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on port :${PORT}`);
    });
  })
  .catch((error) => console.log(error));
