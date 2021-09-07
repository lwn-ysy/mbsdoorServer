const express = require('express');
const router = express.Router();
const { validateUser } = require('../db/frontback_login');

// 登录，返回token
// 接收 username和password 数据
router.post('/login', async (req, res, next) => {
    let { username, password } = req.body;
    // 验证账号密码是否正确
    try {
        let userData = await validateUser(username, password);
        if (userData.isValidate) {
            res.json(userData.token);
        } else {
            res.status(800).json({message:'账号或者密码错误'});
        }

    } catch (error) {
        next(error);
    }
})
module.exports = router;