'use strict';

const { ObjectId } = require('mongodb');
const bookModel = require('../database/models').Book;
/*
*
*
*       Complete the API routing below
*       
*       
*/
module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      //get all books
      bookModel.find({}).then(function (books) {
        res.send(books);
        return;
        });
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      // check if data exists
      if (!title) {
        res.end("missing required field title");
        return;
      }
      // create new Book
      const newBook = new bookModel({title: title});
      // safe new book
        newBook.save((err, data) => {
        // check error
          if (err || !data) {
            res.send("missing required field comment");
            return;
          } else {
            res.json({ _id: newBook._id, title: newBook.title, });
            return;
          }
        });
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      bookModel.deleteMany({}, function(err){
        if (err) {
          console.log(err)
          res.send("error occured")
          return;
        } else {
          console.log('complete delete successful')
          res.send("complete delete successful")
        }
      });
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = ObjectId(req.params.id);
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      // Find a book by their _id
      bookModel.findById(bookid, (err, book) => {
      if (err) {
        console.error(err);
        res.send('An error occurred');
      } else if (book) {
      // Send the data if the book exists
      res.send(book);
      } else {
      // Send a message if the book does not exist
      res.send("no book exists");
      }
    });
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      if (!comment) {
        res.send("missing required field comment");
        return;
      }
      //find bookid and update values
      bookModel.findByIdAndUpdate(bookid, {$push: { comments: comment }, $inc: {commentcount: 1} }, {new: true}, function(err, data){
        if (err) {
          console.error(err);
          res.send('An error occurred');
          return;
        } else if (data) {
          res.json(data);
          return;
        } else {
          res.send('no book exists');
        }
      });
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      bookModel.findOneAndDelete(ObjectId(bookid), function(err, book){
        if (err) {
          console.log(err)
          res.send('An error occured')
          return;
        } else if (book) {
          res.send('delete successful')
          return
        } else {
          res.send('no book exists')
          return
        }
      });
    });
};
