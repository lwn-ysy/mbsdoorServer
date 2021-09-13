const express = require('express');
const router = express.Router();
const { dbGetTag, dbDeleteTag, dbAddTag, dbUpdateTag } = require('../controller/frontback_tag');

// 获取
router.get('/tag', async (req, res, next) => {
  try {
    let userData = await dbGetTag();
    res.json({ code: 20000, data: userData })
  } catch (error) {
    next(error);
  }
})
// 删除
router.delete('/tag', async (req, res, next) => {
  let { tagID } = req.query;
  try {
    await dbDeleteTag(tagID);
    res.json({ code: 20000, data: '删除成功' })

  } catch (error) {
    next(error);
  }
})
// 增加
router.post('/tag', async (req, res, next) => {
  try {
    let data = req.body;
    await dbAddTag(data);
    res.json({ code: 20000, data: '用户添加成功' })
  } catch (error) {
    next(error);
  }
})



// 更新
router.put('/tag', async (req, res, next) => {
  try {
    let data = req.body;
    await dbUpdateTag(data);
    res.json({ code: 20000, data: '更新成功' })

  } catch (error) {
    next(error);
  }
})



module.exports = router;