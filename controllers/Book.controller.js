const BookRouter = require('express').Router();
const axios = require('axios');
const BookModel = require('../models/Books.models')

BookRouter.post('/', async (req, res) => {
    try {
    
        // Make a request to the Google Books API
        const response = await axios.get(`${process.env.GOOGLE_BOOK_API_URL}?q=${process.env.GOOGLE_BOOK_TOPIC}&key=${process.env.GOOGLE_BOOK_API_KEY}&maxResults=40`);
    
        // Extract and format the data
        const books = response.data.items.map((item) => ({
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors,
          description: item.volumeInfo.description,
          publishedDate: item.volumeInfo.publishedDate,
          pageCount: item.volumeInfo.pageCount,
          thumbnailUrl: item.volumeInfo.imageLinks.thumbnail,
          infoLink: item.volumeInfo.infoLink,
        }));
    
        // Save the books to MongoDB
        await BookModel.insertMany(books);
    
        return res.status(200).json({ message: 'Books saved to MongoDB', books });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
});


BookRouter.get('/get', (req,res,next) => {
    BookModel.find({})
        .then(response => {
            return res.status(200).json({
                result : response,
                success : true,
            })
        })
        .catch(err => {
            return res.status(401).json({
                success : false,
                Error : err
            })
        })
})

module.exports = BookRouter;
