require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./db/db");
const UserAuthRouter = require("./routes/UserAuthRouter");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

const PORT = process.env.PORT;

//미들웨어
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//login routes
app.use("/user", UserAuthRouter);

const server = () => {
  dbConnect();
  app.listen(PORT, () => {
    console.log(`listening to port  http://localhost:${PORT}`);
  });
};

server();
