const express = require('express')
const router = express.Router();

const { dbGetBlog } = require('../controller/blog');


router.get('/', async (req, res, next) => {
  let { offset } = req.query;
  try {
    let blogLists = await dbGetBlog(parseInt(offset));
    res.json(blogLists);
  } catch (error) {
    next(error);
  }

})


module.exports = router;