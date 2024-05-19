require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./db/db");
const UserAuthRouter = require("./routes/UserAuthRouter");
const cookieParser = require("cookie-parser");
const axios = require("axios");

const app = express();
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

// 미들웨어
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// 로그인 라우트
app.use("/user", UserAuthRouter);

// 이미지 검색 라우트
const clientId = process.env.NAVER_CLIENT_ID;
const clientSecret = process.env.NAVER_CLIENT_SECRET;

app.get("/search", async (req, res) => {
  const query = req.query.query;
  const url = "https://openapi.naver.com/v1/search/image";
  const options = {
    headers: {
      "X-Naver-Client-Id": clientId,
      "X-Naver-Client-Secret": clientSecret,
    },
    params: {
      query: query,
      display: 3,
      start: 1,
    },
  };

  try {
    const response = await axios.get(url, options);
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

const server = () => {
  dbConnect();
  app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
  });
};

server();
