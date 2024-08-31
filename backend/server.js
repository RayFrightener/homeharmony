const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const  { Pool } = require('pg');

const app = express();
// This block of code sets up the connection parameters for 
// your app to communicate with the PostgreSQL database. 
// Once configured, you can use the pool object to run queries and 
// interact with your database in the rest of your application.
const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432,
}); 

app.use(bodyParser.json()); //Configures your Express app to automatically parse JSON data from incoming requests, so you can easily access it via req.body.
app.use(cors()); // Configures your Express app to allow requests from other domains, making your server accessible from different origins.

app.post('/api/roommates', async (req, res) => { // is a method provided by Express to handle HTTP POST requests. This is how you define what your server should do when it receives a POST request at a specific URL.
  const { name, phone } = req.body; //contains the data sent by the client in the request body. In your case, this would be the JSON object sent from the frontend form.const { name, phone } = req.body; is destructuring. It extracts the name and phone properties from the req.body object and stores them in the variables name and phone.
  const result = await pool.query('INSERT INTO roommates (name, phone) VALUES ($1, $2) RETURNING *', [name, phone]);
  res.json(result.rows[0]); // res.json(...) sends a JSON response back to the client. result.rows[0] is the first row returned by the SQL query, which contains the data that was just inserted into the database
});

app.post('/api/duties', async (res, req) => {
  const { name } = req.body;
  const result = await pool.query('INSERT INTO duties (name) VALUES ($1) RETURNING *', [name]);
  res.json(result.rows[0]); 
});

app.post('/api/assignments', async (req, res) => {
  const { userId, dutyId } = req.body;
  // Logic to send SMS using twilio or another service
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
