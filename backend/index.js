import express from "express";
import {PORT, mongodbURL} from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/bookModel.js"

const app = express();

// Middleware to parse JSON request body
app.use(express.json());

//entry point for nodemon
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome To MERN Stack Tutorial');
  });

//saving a new book
app.post('/books', async (request, response) => {
   try{
    const { title, author, publishYear, genre } = request.body;
    // Check for required fields
    if (!title || !author || !publishYear || !genre) {
        return response.status(400).send({
          message: "Send all the required fields: title, author, publishYear, genre",
        });
      }

      const newBook = new Book({
        title,
        author,
        publishYear,
        genre,
      });
      // Save to database
    const book = await Book.create(newBook);
    return response.status(200).send(book);


   }catch(error){
    console.log(error.message);
    if (error.name === "ValidationError") {
        return response.status(400).send({
          message: error.message,
        });
      }
    response.status(500).send({message : error.message})
   }
})

//route for getting all the books
//app.get('/books')

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

