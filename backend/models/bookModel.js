import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
    title : {
        type: String,
        required: true
    },
    author : {
        type: String,
        required : true
    },
    publishYear : {
        type: Number,
        required : true
    },
    userRating : {
       type: Number,
       required : false
    },
    genre : {
        type: [String],
        validate: {
            validator: (array) => array.length <= 3,
            message: "You can specify upto 3 genres only!"
    },
        required: true
},
},
{
    timestamps : true,
})



export const Book = mongoose.model('Book', bookSchema);