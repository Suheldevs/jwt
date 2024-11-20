const express = require('express');
const app = express();
const dotenv = require('dotenv');
const userRouter = require('./routes/user')
dotenv.config();
const { dbConnection } = require('./connection')

app.use(express.json());
dbConnection(process.env.MONGO_URL);

app.use('/user', userRouter);
app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`);
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})




