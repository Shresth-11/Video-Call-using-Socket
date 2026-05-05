import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js"

// humara socket ka server jo h voh alag hai or jo express ka instance hai voh alag h
// toh hume isko connect krne k liye kch chahiye or voh krta h humara createserver

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));


app.use("/api/v1/users", userRoutes)



app.get("/", (req, res) => {
  return res.json({ hello: "World" });
}); 

const start = async () => {
  const connectionDb = await mongoose.connect(
    "mongodb+srv://jaisshresth143_db_user:shresth123@cluster0.mubxzfu.mongodb.net/videoapp?retryWrites=true&w=majority",
  );

  console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);

  server.listen(app.get("port"), () => {
    console.log("LISTENING ON PORT 8000");
  });
};

start();
