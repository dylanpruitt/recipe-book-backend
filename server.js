const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});
const PORT = process.env.PORT || 3001

const test = "postgres://kfdkgxddajedul:3f1f7b0aa0a1ea0197f6c8b1c8733094ba19ab3ca2ab5f4a26fee5f027729253@ec2-34-234-240-121.compute-1.amazonaws.com:5432/dbm7ioqi20c60o"
console.log("URL : " + process.env.DATABASE_URL)

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: test,
  ssl: {
    rejectUnauthorized: false
  }
});

var numRecipes = 0;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

io.on('connection', async (socket) => {
  var queryResults = await getQuery('SELECT * FROM recipes');
  numRecipes = queryResults.results.length;
  io.to(socket.id).emit('recipe query', queryResults);

  socket.on("database submission", (item) => {
    console.log("SUBMISSION");
    console.log(item);
    submitToDatabase(item);

    queryResults.results.push(item);
    socket.emit('recipe query', queryResults);
  })
});

server.listen(PORT, () => console.log(`Listening on ${PORT}`));

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
    const values = [numRecipes + 1, item.title, item.description, item.ingredients, item.directions];

    const client = await pool.connect();
    const result = await client.query(text, values);
    const results = { 'results': (result) ? result.rows : null };
    client.release();
    return results;
  } catch (err) {
    console.error(err);
  }
}