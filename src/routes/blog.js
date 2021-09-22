const express = require('express')
const router = express.Router();

const { dbGetBlog, DbGetSearchBlog } = require('../controller/blog');


router.get('/', async (req, res, next) => {
  let { offset } = req.query;
  try {
    let blogLists = await dbGetBlog(parseInt(offset));
    res.json(blogLists);
  } catch (error) {
    next(error);
  }
})


router.get('/search', async (req, res, next) => {
  let data = req.query;
  try {
    let blogLists = await DbGetSearchBlog(data);
    res.json(blogLists);
  } catch (error) {
    next(error);
  }
})

module.exports = router;