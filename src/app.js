import express from 'express';
import { configDotenv } from 'dotenv';
import cookieParser from 'cookie-parser';
import router from './routes/user.js';
import connectDB from './config/database.js';
const app = express();

// ! To parse incoming requests with JSON payloads
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 3000;
configDotenv();
app.use(router);

// app.get('/profile', async (req, res) => {
//     const cookies = req.cookies;
//     console.log(cookies);

//     res.send('Reading Cookies');
// })

connectDB().then(() => {
    console.log('Database connection established successfully');
    app.listen(port, () => {
        console.log(`We are listening at the number ${ port }...`);
    })
}).catch(err => {
    console.error('Database cannot be connected!!', err);
});
