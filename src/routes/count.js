const express = require('express');
const router = express.Router();
const { countShop } = require('../db/count')
// 获取
router.get('/count', async (req, res, next) => {
  try {
    let result = await countShop();
    res.json({ code: 20000, data: result })
  } catch (error) {
    next(error);
  }
})


module.exports = router;