//Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

const PUBLIC_DIR = path.resolve(__dirname, "public");
const DB_DIR = path.resolve(__dirname, "db");

//notes
let notes = [];

//set up the express app
const app = express();
const PORT = process.env.PORT || 3001;

// set Express static path
app.use(express.static(path.join(__dirname,"public")));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get('/', (req, res) => res.sendFile(path.join(PUBLIC_DIR, 'index.html')))

app.get('/notes', (req, res) => res.sendFile(path.join(PUBLIC_DIR, 'notes.html')))

//Should read the `db.json` file and return all saved notes as JSON.
app.get('/api/notes', (req, res)  => res.sendFile(path.join(DB_DIR, 'db.json')))

app.post('/api/notes', (req, res) => {
    //POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, 
    //POST from user using middleware to parse the information
    const newNote = req.body

    newNote.id = newNote.title.replace(/\s+/g, "").toLowerCase();

    try{    
        notes = fs.readFileSync(path.join(DB_DIR, 'db.json'), 'utf8')
        console.log('Success')
    }catch(err){
        console.error(err)
    }
    notes = JSON.parse(notes)
    
    notes.push(newNote)


    try{    
        notes = fs.writeFileSync(path.join(DB_DIR, 'db.json'),  JSON.stringify(notes))
        console.log('Success')
    }catch(err){
        console.error(err)
    }
    
    //and then return the new note to the client.
    res.sendFile(path.join(DB_DIR, 'db.json'))
})

app.get('/api/notes/:id', (req, res) => {
    //Should receive a query parameter containing the id of a note to delete. 
    //This means you'll need to find a way to give each note a unique `id` when it's saved. 
    //In order to delete a note, you'll need to read all notes from the `db.json` file, 
    //remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
})


//start server
app.listen(PORT, function() {
    console.log("App listening on http://LocalHost:" + PORT);
  });