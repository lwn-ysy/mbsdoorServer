const express = require('express');
const router = express.Router();
const { dbGetBanner, dbDeleteBanner, dbUpdateBanner } = require('../controller/frontback_banner');

// 获取
router.get('/banner', async (req, res, next) => {
  try {
    let result = await dbGetBanner();
    res.json({ code: 20000, data: result })
  } catch (error) {
    next(error);
  }
})
// 删除
router.delete('/banner', async (req, res, next) => {
  let { bannerID } = req.query;
  try {
    await dbDeleteBanner(bannerID);
    res.json({ code: 20000, data: '删除成功' })

  } catch (error) {
    next(error);
  }
})


// 更新
router.put('/banner', async (req, res, next) => {
  let data = req.body;
  try {
    await dbUpdateBanner(data);
    res.json({ code: 20000, data: '更新成功' })

  } catch (error) {
    next(error);
  }
})

// 增加
router.post('/banner', async (req, res, next) => {
  let { userID, roleID } = req.body;
  try {
    await dbUpdateRole(userID, roleID);
    res.json({ code: 20000, data: '更新成功' })

  } catch (error) {
    next(error);
  }
})



module.exports = router;