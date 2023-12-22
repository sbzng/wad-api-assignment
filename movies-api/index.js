import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from './api/users';
import './db';
import defaultErrHandler from './errHandler'
import moviesRouter from './api/movies';   //import movies router
import reviewsRouter from './api/reviews';
import tvShowsRouter from './api/tvShows';
import actorsRouter from './api/actors';
import authenticate from './authenticate';

dotenv.config();


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swaggerConfig');
const app = express();
const port = process.env.PORT; 


app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);


app.use('/api/movies', moviesRouter); //ADD THIS BEFORE THE DEFAULT ERROR HANDLER.
app.use('/api/reviews', reviewsRouter);
app.use('/api/tvShows', tvShowsRouter);
app.use('/api/actors', actorsRouter);
app.use('/api/movies',authenticate,  moviesRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(defaultErrHandler);



app.listen(port, () => {
  console.info(`Server running at ${port}`);
});