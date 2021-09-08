const express = require('express');
const router = express.Router();
const { dbGetUserInfo, dbValidateUserLogin } = require('../controller/frontback_login');

// 登录，返回token
// 接收 username和password 数据
// 目前以用户id为token
router.post('/login', async (req, res, next) => {
    let { username, password } = req.body;
    // 验证账号密码是否正确
    try {
        let userData = await dbValidateUserLogin(username, password);
        if (userData.isValidate) {
            res.json({ code: 20000, data: { token: userData.token } });
        } else {
            res.json({ code: 50012, message: '账号或者密码错误' });
        }

    } catch (error) {
        next(error);
    }
})


router.get('/info', async (req, res, next) => {
    let { token } = req.query;
    try {
        let { isValidate, result } = await dbGetUserInfo(token);
        if (isValidate) {
            res.json({ code: 20000, data: result });
        } else {
            res.json({ code: 50008, message: 'token无效' });
        }
    } catch (error) {
        next(error);
    }
})


router.post('/logout', (req, res, next) => {
    res.json({ code: 20000, data: 'success' })
})


module.exports = router;