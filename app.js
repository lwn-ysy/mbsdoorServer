const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const personal = require('./src/routes/personal');
const index = require('./src/routes/index');
const login = require('./src/routes/login');
const showpic = require('./src/routes/showpic');
const frontback_login = require('./src/routes/frontback_login');

const PORT = 5000;


//上线环境


//上线环境
// const option = {
//     pfx: fs.readFileSync('./certificate/mbsdoor.com.pfx'),
//     passphrase: '3434902qwe'
// };
// const httpsServer = https.createServer(option, app);

// 设置跨域允许
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    next();
});

// 静态文件路由
app.use('/static', express.static('static', {
    maxAge: 600000,
    lastModified: true,
    cacheControl: true,
}));

app.use(bodyParser.json());

//常规路由--微信小程序
app.use('/personal', personal);
app.use('/index', index);
app.use('/login', login);
app.use('/showpic', showpic);
app.use('/vue-admin-template/user', frontback_login);

// 后台系统管理vue项目


// 500界面
app.use((err, req, res, next) => {
    res.status(500).send({ error: err.message });
});


// //上线环境
// httpsServer.listen(PORT, () => {
//     console.log("server running at port ", PORT)
// })

// dev环境
app.listen(PORT, () => {
    console.log("server running at port ", PORT)
})