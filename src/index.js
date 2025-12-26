import express from 'express';
import SERVER_CONFIG from './config/server.config.js';

const app = express();

app.get('/ping', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'pong'
    });
})

app.listen(SERVER_CONFIG.PORT, () => {
    console.log(`Server is running on port ${SERVER_CONFIG.PORT}`);
})