import express from 'express';
import { createNotes, deleteNotes, getAllNotes, getNoteById, updateNotes } from '../controllers/notesController.js';
const router = express.Router();

/*router.get("/", (req,res)=>{
    res.send("Notes API is running successfully");
});
*/

router.get("/", getAllNotes);
router.get("/:id", getNoteById); // Assuming you want to fetch a specific note by ID, though this might not be the intended use
router.post("/", createNotes);
router.put("/:id",updateNotes);
router.delete("/:id",deleteNotes);



export default router; 

