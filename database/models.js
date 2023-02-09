const mongoose = require("mongoose");
const { Schema } = mongoose;

//book schema with array of comments
const BookSchema = new Schema({
    title: {type: String, required: true},
    comments: [String],
    commentcount: {type: Number, default: 0}
});

const Book = mongoose.model('Book', BookSchema);

exports.Book = Book;