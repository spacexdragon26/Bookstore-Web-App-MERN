import express, { request } from "express";
import {PORT, mongodbURL} from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js'

const app = express();

// Middleware to parse JSON request body
app.use(express.json());


//using router
app.use('/books', booksRoute);

//entry point for nodemon
app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

mongoose.connect(mongodbURL)
.then( () => {
  console.log("App connected to database")
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
})
.catch( (error) => {
  console.log(error)
});

