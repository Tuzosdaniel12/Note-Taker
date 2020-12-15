//Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const RandomID = require ("./lib/js/RandomID.js")

const PUBLIC_DIR = path.resolve(__dirname, "public");
const DB_DIR = path.resolve(__dirname, "db");

//set up the express app
const app = express();
const PORT = process.env.PORT || 3001;

// set Express static path
app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get('/', (req, res) => res.sendFile(path.join(PUBLIC_DIR, 'index.html')))

app.get('/notes', (req, res) => res.sendFile(path.join(PUBLIC_DIR, 'notes.html')))

//Should read the `db.json` file and return all saved notes as JSON.
//Should read the `db.json` file and return all saved notes as JSON.
app.get('/api/notes', (req, res)  => {
    //notes
    let notes = readFileDB();

    notes = JSON.parse(notes)

     res.json(notes)
})


//POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, 
//POST from user using middleware to parse the information
app.post('/api/notes', (req, res) => {
    const newNote = req.body
    const randId = new RandomID();
     

    let notes = readFileDB();

    newNote.id = randId.createUniqueID();

    notes = JSON.parse(notes)

    notes.push(newNote)

    writeFileDB(notes);

    //and then return the new note to the client.
    return res.json(newNote)
})

app.delete('/api/notes/:id', (req, res) => {
    //Should receive a query parameter containing the id of a note to delete.
    const id = req.params.id 
    let notes = [];

    console.log(id)
    //read file and store it in notes
    //In order to delete a note, you'll need to read all notes from the `db.json` file,
    notes = readFileDB()
    
    // need to filter notes so I can use it in filter
    //remove the note with the given `id` property,
    notes = JSON.parse(notes).filter(note => note.id != id);

    console.log(notes)

    //then rewrite the notes to the `db.json` file.
    writeFileDB(notes)

    //and then return the new note to the client.
    return res.json(notes)
 
})

app.get('*', (req, res) => res.sendFile(path.join(PUBLIC_DIR, 'index.html')))

//start server
app.listen(PORT, function() {
    console.log("App listening on http://LocalHost:" + PORT);
  });


  //read and write functions
  readFileDB = (notes) => {
    try{    
        notes = fs.readFileSync(path.join(DB_DIR, 'db.json'), 'utf8')
    }catch(err){
        console.error(err)
    }
    return notes;
  }

  writeFileDB = (notes) => {
    try{    
        fs.writeFileSync(path.join(DB_DIR, 'db.json'),  JSON.stringify(notes))
        console.log('Success')
    }catch(err){
        console.error(err)
    }
    return
  }