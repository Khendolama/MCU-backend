const express = require('express');
const app = express();
//const path = require('path');
const logger = require('morgan')
const connectToMongoDB = require('./db/mongodb');
require('dotenv').config();

// prevent CORS issue
const cors = require('cors')

// Give access to any origin
const corsOptions = {
    origin: "*",
    corsSuccessStatus: 200
}

app.use(cors(corsOptions))


// Read incoming requests properly
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// logs requests to the server
app.use(logger('dev'))


const McuRouter = require('./routes/McuRouter');
// localhost:3001/...
app.use('/Mcu', McuRouter);

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);

    connectToMongoDB();
});
