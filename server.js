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

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

io.on('connection', async (socket) => {
  const queryResults = await getQuery('SELECT * FROM recipes');
  io.to(socket.id).emit('recipe query', queryResults);
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