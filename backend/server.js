import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import dotenv from "dotenv";
import authenticationRouter from "./routers/authentication.js";
import balanceRouter from "./routers/balance.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());
app.use(Cors());
app.use(cookieParser());
app.use("/auth", authenticationRouter);
app.use("/balance", balanceRouter);
app.use(errorHandler);

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERR", err));

app.get("/", (req, res) => res.status(200).send("Connection Verified"));

app.listen(port, () => console.log(`Server is running on the port ${port}`));
