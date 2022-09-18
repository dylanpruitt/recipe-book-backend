require('dotenv').config()
const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "https://dpruitt-recipes-frontend.herokuapp.com",
  }
});
const PORT = process.env.PORT || 3001

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

import UploadStatus from './src/utils/UploadStatus';

var numRecipes = 0;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

io.on('connection', async (socket) => {
  console.log("Connection started.");
  var queryResults = await getQuery('SELECT * FROM recipes');
  numRecipes = queryResults.results.length;
  io.to(socket.id).emit('recipe query', queryResults);

  socket.on("database submission", (item) => { handleSubmission(socket, item) });
});

server.listen(PORT, () => console.log(`Listening on ${PORT}`));

async function handleSubmission(socket, item) {
  console.log("Database submission:");
    console.log(item);
    
    const results = await submitToDatabase(item);
    console.log(results);
    if (results != null) {
      addRecipeToListing(item, socket);
      io.to(socket.id).emit('upload status', UploadStatus.SUCCESS);
    } else {
      io.to(socket.id).emit('upload status', UploadStatus.ERROR);
    }
}

async function addRecipeToListing(item, socket) {
  var queryResults = await getQuery('SELECT * FROM recipes');
  queryResults.results.push(item);
  numRecipes++;

  socket.emit('recipe query', queryResults);
}

async function getQuery(query) {
  try {
    const client = await pool.connect();
    const result = await client.query(query);
    const results = { 'results': (result) ? result.rows : null };
    client.release();
    return results;
  } catch (err) {
    console.error(err);
  }
}

async function submitToDatabase(item) {
  try {
    const text = 'INSERT INTO recipes(id, name, description, ingredients, directions) VALUES($1, $2, $3, $4, $5)'
    const values = [numRecipes + 1, item.name, item.description, item.ingredients, item.directions];

    const client = await pool.connect();
    const result = await client.query(text, values);
    const results = { 'results': (result) ? result.rows : null };
    client.release();
    return results;
  } catch (err) {
    console.error(err);
  }
}