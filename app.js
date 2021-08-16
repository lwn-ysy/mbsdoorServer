const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const personal = require('./src/routes/personal/personal');
const index = require('./src/routes/index');
const login = require('./src/routes/login')

const PORT = 5000;


//上线环境


//上线环境
const option = {
    pfx: fs.readFileSync('./certificate/mbsdoor.com.pfx'),
    passphrase: '3434902qwe'
};
const httpsServer = https.createServer(option, app);



// 静态文件路由
app.use('/static', express.static('static'));

app.use(bodyParser.json());

//常规路由
app.use('/personal', personal)
app.use('/index', index)
app.use('/login', login)

// 500界面
app.use((err, req, res, next) => {
    res.status(500).send({ error: err.message });
});


上线环境
httpsServer.listen(PORT, () => {
    console.log("server running at port ", PORT)
})

//dev环境
// app.listen(PORT, () => {
//     console.log("server running at port ", PORT)
// })