const express = require('express');
const router = express.Router();
const { dbGetRole, dbUpdateRole, dbDeleteRole } = require('../controller/frontback_role');

// 获取
router.get('/', async (req, res, next) => {
  try {
    let result = await dbGetRole();
    res.json({ code: 20000, data: result })
  } catch (error) {
    next(error);
  }
})
// 删除
router.delete('/', async (req, res, next) => {
  let { userID } = req.query;
  try {
    await dbDeleteRole(userID);
    res.json({ code: 20000, data: '删除成功' })

  } catch (error) {
    next(error);
  }
})


// 更新
router.put('/', async (req, res, next) => {
  let { userID, roleID } = req.body;
  try {
    await dbUpdateRole(userID, roleID);
    res.json({ code: 20000, data: '更新成功' })

  } catch (error) {
    next(error);
  }
})



module.exports = router;