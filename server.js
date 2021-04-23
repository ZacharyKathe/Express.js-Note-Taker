
const express = require('express');
const path = require('path');
const fs = require('fs');
var uniqid = require('uniqid');

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//datasources 
const tableData = require("./db/db");
const { report } = require('process');

//GET request for notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));



//API GET REQUEST

app.get('/api/notes', (req,res) => res.json(tableData));


//POST request

app.post('/api/notes', (req,res) =>{
  var newid = 'id';
  req.body[newid] = uniqid();
  tableData.push(req.body);
  
  res.json(tableData);
})
// GET request for home page
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
  });