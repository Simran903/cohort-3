import { Client } from 'pg'
import express, { json } from 'express'

const app = express();

app.use(express.json());

const pgClient = new Client("postgresql://neondb_owner:PASSWORD@ep-bold-smoke-a5me16vh-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require");
pgClient.connect();

app.post('/signup', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const city = req.body.city;
  const country = req.body.country;
  const street = req.body.street;
  const pincode = req.body.pincode;

  try {
    const insertQuery = `INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING id;`
    const addressInsertQuery = `INSERT INTO addresses(city, country, street, pincode, user_id) VALUES($1, $2, $3, $4, $5);`

    pgClient.query("BEGIN;");

    var response = await pgClient.query(insertQuery, [username, email, password]);
    const userId = await response.rows[0].id;
    const addressInsertResponse = await pgClient.query(addressInsertQuery, [city, country, street, pincode, userId]);

    await new Promise(x => setTimeout(x, 10000));
    pgClient.query("COMMIT;");

    res.json({
      message: "You have signed up"
    })

  } catch (error) {
    res.json({
      message: "Error while signing up"
    })
  }
})

app.get('/metadata', async (req, res) => {
  const id = req.query.id;

  const query1 = "SELECT * FROM users where id=$1";
  const response1 = await pgClient.query(query1, [id]);

  const query2 = "SELECT * FROM addresses where id=$1";
  const response2 = await pgClient.query(query2, [id]);

  res.json({
    user: response1.rows[0],
    addresses: response2.rows
  });
});

app.listen(3000);