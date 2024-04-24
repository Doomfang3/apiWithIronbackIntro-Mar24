const Book = require('../models/Book.model')

const router = require('express').Router()

// Starting with /api/books
/* router.get('/', (req, res) => {
  res.json('All good in books')
}) */

// GET all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find()
    res.status(200).json(books)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})
// GET one book
router.get('/:bookId', async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId)
    res.status(200).json(book)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})
// POST one book
router.post('/', async (req, res) => {
  try {
    const newBook = await Book.create(req.body)
    res.status(201).json(newBook)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})
// PUT one book
router.put('/:bookId', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
      runValidators: true,
    })
    res.status(200).json({ message: 'Book updates successfully', book: updatedBook })
  } catch (error) {
    console.log('Error updating book', error)
    res.status(500).json(error)
  }
})
// DELETE one book
router.delete('/:bookId', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.bookId)
    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})
module.exports = router
