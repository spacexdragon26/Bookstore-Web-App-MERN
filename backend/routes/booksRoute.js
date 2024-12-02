import express from "express";
import { Book } from "../models/bookModel.js"

const router = express.Router();

  //saving a new book
router.post('/', async (request, response) => {
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
router.get('/', async (request, response) => {
    try{
     const books = await Book.find({});
     return response.status(200).json({
      count : books.length,
      data : books
     });
    }catch(error){
      console.error(error.message)
      return response.status(500).send({message: error.message})
    }
  })

  //getting books by id
router.get('/:id', async (request, response) => {
    try{
  
      const { id } = request.params;
     const book = await Book.findById(id);
     return response.status(200).json(book);
  
    }catch(error){
      console.error(error.message)
      return response.status(500).send({message: error.message})
    }
  })

  //update a book using id
router.put("/:id", async (request, response) => {
    try{
      
      const { title, author, publishYear, genre } = request.body;
      // Check for required fields
      if (!title || !author || !publishYear || !genre) {
          return response.status(400).send({
            message: "Send all the required fields: title, author, publishYear, genre",
          });
        }
  
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body,  { new: true });
  
        if(!result){
          return response.status(404).json("Book not found!")
        }
  
        return response.status(200).json("Book updates sucessfully!")
    }
    catch(error){
      console.error(error.message)
      return response.status(500).send({message: error.message})
    }
  });
  
  //deleting a book
router.delete('/:id', async (request, response) => {
    try{
      const { id } = request.params;
      const result = await Book.findByIdAndDelete(id);
  
      if(!result){
        return response.status(400).json("Book not found");
      }
      return response.status(200).json("Book deleted successfully");
    } catch(error){
        console.log(error.message);
        return response.status(500).send({message : error.message})
    }
  });

  export default router;