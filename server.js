const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const dbConnector = require('./config/db');
const { users  } =require('./routes/api');


// connect to the database
dbConnector();

// Base requirements
const app = express();
const PORT = process.env.port || 5001;

// Middleware
// Will replace prohibited characters with _,
app.use(mongoSanitize({ replaceWith: '_' }));
// support parsing of application/json type post data and limit payload
app.use(express.json({ limit: '300kb' }));
//support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', users);


// Listen on the port
app.listen(PORT, () => {
  console.log(`Hey there guise I'm on ports ${PORT}`)
});