const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const app = express();
const cors = require("cors")
const bodyparser = require("body-parser")
const connectDB = require("./Database/DB")
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, "./config.env") });



app.use(cors())
app.use(bodyparser.json());
connectDB()
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


const authRoutes = require('./routes/users');
const ticketRoutes = require('./routes/ticketroute');

app.use(authRoutes);
app.use(ticketRoutes)


// catch 404 Fand forward to error handler

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
