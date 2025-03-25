import cors from 'cors';
import express from 'express';
import { configDotenv } from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import profileRouter from './routes/profile.js';
import requestRouter from './routes/requests.js';
import connectDB from './config/database.js';
const app = express();

// ! To parse incoming requests with JSON payloads
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    // ? Whitelisting the domain
    origin: 'http://localhost:5173',
    credentials: true
}));
configDotenv();
const port = process.env.PORT || 3000;

app.use('/', userRouter);
app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);

connectDB().then(() => {
    console.log('Database connection established successfully');
    app.listen(port, () => {
        console.log(`We are listening at the number ${ port }...`);
    })
}).catch(err => {
    console.error('Database cannot be connected!!', err);
});
