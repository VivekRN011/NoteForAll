import Note from '../models/Note.js';

export async function getAllNotes(req, res) {
    try{
        const notes = await Note.find().sort({ createdAt: -1 }); // Fetch all notes sorted by creation date
        res.status(200).json(notes); 
    }catch(error){
        console.error("Error fetching notes:", error);
        res.status(500).json({message: "Error fetching notes", error: error.message});
    }
}

export async function getNoteById(req, res) {
    const getNoteId = req.params.id;
    try{
        const note = await Note.findById(getNoteId);
        if(!note){
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json(note);
    }catch(error){
        console.error("Error fetching note by ID:", error);
        res.status(500).json({message: "Error fetching note", error: error.message});
    }
}

export async function createNotes(req,res) {
    try{
        const {title,content}=req.body;
        const newNote = new Note({title:title, content:content});
        await newNote.save();
        res.status(201).json({ success: true, message: "New note created successfully", note: newNote });
    }catch(error){
        console.error("Error creating note:", error);
        res.status(500).json({message: "Error creating note", error: error.message});
    }
}

export async function updateNotes(req,res){
    try{
        const {title,content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title:title, content:content}, {new: true});


        if(!updatedNote){
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json({ success: true, message: "Note updated successfully", note: updatedNote });
    }catch(error){
        console.error("Error updating note:", error);
        res.status(500).json({message: "Error updating note", error: error.message});
    }
}

export async function deleteNotes(req,res){
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if(!deletedNote){
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json({message: "Note deleted successfully", success: true});
    }catch(error){
        console.error("Error deleting note:", error);
        res.status(500).json({message: "Error deleting note", error: error.message});
    }
}