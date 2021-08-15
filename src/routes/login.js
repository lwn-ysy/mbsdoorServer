const express = require('express')
const router = express.Router();
const https = require('https');

//  personal界面的，路由处理

router.get('/', (req, res, next) => {
    let code = req.query.code;
    let appid = 'wx68ebf119ae1b0e4f';
    let secret = '489dd2f6848b12e2f7533ddce127f5cd';


    let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`;

    https.get(url, (response) => {
        // 返回的是一个stream数据流
        let datas = [];
        response.on('data', data => {
            datas.push(data);
        })
        response.on('end', () => {
            let result = JSON.parse(datas.toString())
            res.send(result);
        })
    })
})



module.exports = router;