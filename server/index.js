const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/connectDB');
const router = require('./routes/index');
const cookiesParser = require('cookie-parser');
const { app, server } = require('./socket/index');

// CORS configuration
app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        const allowedOrigins = [
            process.env.FRONTEND_URL, // Your frontend URL from .env
            'https://chat-app-chi-two-18.vercel.app', // Additional allowed origin
        ];
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookiesParser());

// Handle preflight requests for all routes
app.options('*', cors()); // This will handle OPTIONS requests for all routes

const PORT = process.env.PORT || 8080;

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
