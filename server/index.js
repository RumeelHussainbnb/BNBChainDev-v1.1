import http from "http";
import express from "express";
import logger from "morgan";

// mongo connection
import "./config/mongo.js";

// routes
import adminRouter from "./routes/admin.js";
import authRouter from "./routes/auth.js";
import libraryRouter from "./routes/library.js";
import playlistRouter from "./routes/playlist.js";
import userRouter from "./routes/user.js";
import tweetRouter from "./routes/tweet.js";
import contentRouter from "./routes/content.js";
import dotenv from 'dotenv';

const app = express();
dotenv.config();

/** Get port from environment and store in Express. */
const port = process.env.PORT || "3001";
app.set("port", port);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.use("/auth", authRouter);
app.use("/library", libraryRouter);
app.use("/playlists", playlistRouter);
app.use("/user", userRouter);
app.use("/tweets", tweetRouter);
app.use("/content", contentRouter);
app.use("/", adminRouter);

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist'
  })
});

/** Create HTTP server. */
const server = http.createServer(app);

/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`)
});
