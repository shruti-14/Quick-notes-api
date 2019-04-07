const Note = require('../models/note.model');

//create and save a note
exports.create= (req,res)=>{
    //check if note body is empty
    if(!req.body.content){
        return res.status(400).send({
            message:"Note body cannot be empty"
        })
    }
    //creating a note
    const note = new Note({
        title: req.body.title || 'Untitled Note',
        content: req.body.content
    });

    //saving the note in database
    note.save()
    .then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occured while creating the note"
        });
    });
};

//fetch all notes
exports.fetchAll=(req,res)=>{
    Note.find()
    .then(notes=>{
        res.send(notes)
    }).catch(err=>{
        res.status(500).send({        
            message:err.message || "Some error occured while fetching all the notes"
        });
    });
}

//fetch using note id
exports.fetchById=(req,res)=>{
    Note.findById(req.params.noteId)
    .then(note=>{
        if(!note){
            return res.status(400).send({
                message:"Note of id "+req.params.noteId+" not found"
            });
        }
        res.send(note);
    }).catch(err=>{
        if(err.kind==="ObjectId"){
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });     
        }
        return res.status(500).send({
            message: err.message || "Some error occured while fetching the note of id" + req.params.noteId
        });
    });
};

//Update a note with noteid
exports.update=(req,res)=>{
    //check if note body is empty
    if(!req.body.content){
        return res.status(400).send({
            message:"Note body cannot be empty"
        })
    }
    //find the note and update it with the given body
    Note.findByIdAndUpdate(req.params.noteId,{
        title:req.body.title || "Untitled note",
        content: req.body.content
    }, {new:true})
    .then(note=>{
        if(!note){
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};

//delete a note with note id
exports.delete = (req,res)=>{
    Note.findByIdAndDelete(req.params.noteId)
    .then(note=>{
        if(!note){
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({message:"Note deleted successfully"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};
