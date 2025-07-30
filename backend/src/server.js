import express from "express";
//const express= require('express');
import notesRoutes from "./routes/notesRoutes.js";
import { connect } from "mongoose";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

//console.log("Environment Variables:", process.env.MONGO_URI);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve(); // Get the current directory name
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173", // Allow requests from this origin
      methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
      credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    })
  ); // Enable CORS for all routes
}
app.use(express.json()); // Middleware to parse JSON bodies
app.use(rateLimiter);

/*
app.use((req,res,next)=>{
    console.log(`${req.method} request for '${req.url}'`);
    next();
})
*/
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist"))); // Serve static files from the frontend build directory
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  // Connect to MongoDB then start the server
  app.listen(PORT, () => {
    console.log("Server is running on port 5001");
  });
});

// app.get("/api/notes", (req,res)=>{
//     res.send("API is running successfully");
// })

// app.post("/api/notes", (req,res)=>{
//     res.status(201).json({success: "New Note Created"});
// })

// app.put("/api/notes/:id", (req,res)=>{
//     res.status(200).json({success: "Note Updated"});
// })

// app.delete("/api/notes/:id", (req,res)=>{
//     res.status(200).json({success: "Note Deleted"});
// })
