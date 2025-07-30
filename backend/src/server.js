import express from "express";
//const express= require('express');
import notesRoutes from "./routes/notesRoutes.js";
import { connect } from "mongoose";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

//console.log("Environment Variables:", process.env.MONGO_URI);

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

app.use(cors(
  {
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  }
)); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
app.use(rateLimiter);


/*
app.use((req,res,next)=>{
    console.log(`${req.method} request for '${req.url}'`);
    next();
})
*/
app.use("/api/notes", notesRoutes);

connectDB().then(() => { // Connect to MongoDB then start the server
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
