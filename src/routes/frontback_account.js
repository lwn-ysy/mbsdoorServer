const express = require('express');
const router = express.Router();
const { dbGetAccount, dbDeleteAccount, dbAddAccount, dbUpdateAccount } = require('../controller/frontback_account');

// 获取
router.get('/info', async (req, res, next) => {
  try {
    let userData = await dbGetAccount();
    res.json({ code: 20000, data: userData })
  } catch (error) {
    next(error);
  }
})
// 删除
router.delete('/info', async (req, res, next) => {
  let { userID } = req.query;
  try {
    await dbDeleteAccount(userID);
    res.json({ code: 20000, data: '删除成功' })

  } catch (error) {
    next(error);
  }
})
// 增加
router.post('/info', async (req, res, next) => {
  let data = req.body;
  try {
    await dbAddAccount(data);
    res.json({ code: 20000, data: '用户添加成功' })
  } catch (error) {
    next(error);
  }
})



// 更新
router.put('/info', async (req, res, next) => {
  let data = req.body;
  try {
    await dbUpdateAccount(data);
    res.json({ code: 20000, data: '更新成功' })

  } catch (error) {
    next(error);
  }
})



module.exports = router;