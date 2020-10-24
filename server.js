//Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");

// Sets up Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Setting up express app to handle data parsing
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setting up HTML routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});


// Display Saved Notes from db.json File
app.get("/api/notes", function(req, res) {
    return res.json(db);
});

let noteCounter = 1;

//Save notes you post
app.post("/api/notes", function(req, res) {
    req.body.id = noteCounter++;
    let newNote = req.body
    fs.writeFileSync("db/db.json", JSON.stringify(db));
    console.log(newNote);
    db.push(newNote);
    res.json(newNote);
});

//Delete Notes
app.delete("/api/notes/:id", function(req, res) {
    let noteID = req.params.id;
    console.log("this is noteID " + noteID);
    for (let i = 0; i < db.length; i++) {
        if (noteID = db[i].id) {
            console.log(db[i].id);
            db.splice(i, 1);
        };
        fs.writeFileSync("db/db.json", JSON.stringify(db));
        res.end();
    };

});

app.listen(PORT, () => {
    console.log("app listenting on PORT " + PORT);
});