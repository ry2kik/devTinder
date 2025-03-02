import express from 'express';
import { configDotenv } from 'dotenv';
import router from './routes/user.js';
import connectDB from './config/database.js';
const app = express();

// ! To parse incoming requests with JSON payloads
app.use(express.json());
const port = process.env.PORT || 3000;
configDotenv();
app.use(router);

connectDB().then(() => {
    console.log('Database connection established successfully');
    app.listen(port, () => {
        console.log(`We are listening at the number ${ port }...`);
    })
}).catch(err => {
    console.error('Database cannot be connected!!', err);
});
