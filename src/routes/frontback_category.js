const express = require('express');
const router = express.Router();
const { dbGetCategory, dbDeleteCategory, dbAddCategory, dbUpdateCategory } = require('../controller/frontback_category');

// 获取
router.get('/category', async (req, res, next) => {
  try {
    let userData = await dbGetCategory();
    res.json({ code: 20000, data: userData })
  } catch (error) {
    next(error);
  }
})
// 删除
router.delete('/category', async (req, res, next) => {
  let { categoryID } = req.query;
  try {
    await dbDeleteCategory(categoryID);
    res.json({ code: 20000, data: '删除成功' })

  } catch (error) {
    next(error);
  }
})
// 增加
router.post('/category', async (req, res, next) => {
  try {
    let data = req.body;
    await dbAddCategory(data);
    res.json({ code: 20000, data: '添加成功' })
  } catch (error) {
    next(error);
  }
})



// 更新
router.put('/category', async (req, res, next) => {
  try {
    let data = req.body;
    await dbUpdateCategory(data);
    res.json({ code: 20000, data: '更新成功' })

  } catch (error) {
    next(error);
  }
})



module.exports = router;