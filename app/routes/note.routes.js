module.exports = (app) =>{
    const notes = require('../controller/note.controller');

    //creating a new note
    app.post('/notes',notes.create);

    //fetch all notes
    app.get('/notes',notes.fetchAll);

    //get using note id
    app.get('/notes/:noteId',notes.fetchById);

    //Update a note with noteid
    app.put('/notes/:noteId',notes.update);

    //Delete a note with note id
    app.delete('/notes/:noteId',notes.delete);
}