const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/connectDB');
const router = require('./routes/index');
const cookiesParser = require('cookie-parser');
const { app, server } = require('./socket/index');

// Initialize express app
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use(express.json());
app.use(cookiesParser());

const PORT = process.env.PORT || 8080;

// Handle preflight requests
app.options('*', cors());

// Health check endpoint
app.get('/', (request, response) => {
    response.json({
        message: "Server running at " + PORT
    });
});

// API endpoints
app.use('/api', router);

// Connect to the database and start the server
connectDB().then(() => {
    server.listen(PORT, () => {
        console.log("Server running at " + PORT);
    });
});
