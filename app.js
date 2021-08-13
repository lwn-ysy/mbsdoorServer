const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const path = require('path');

const { getIndexBannerlist, getIndexCategoryList, getIndexShopList, getTag } = require('./src/db/mysql');

const PORT = 443;

const option = {
    pfx: fs.readFileSync('./certificate/mbsdoor.com.pfx'),
    passphrase: '3434902qwe'
};
const httpsServer = https.createServer(option,app);
// 静态文件路由
app.use(express.static('static'));

app.get('/test', (req, res, next) => {
    res.send('成功');
})
// 主界面banner路由
app.get('/index/banner', async (req, res, next) => {
    try {
        const bannerData = await getIndexBannerlist(); // return的是res数据，而不使用await，return的是promise
        res.json(bannerData);
    } catch (err) {
        next(err);
    }
})
// 主界面category路由
app.get('/index/category', async (req, res, next) => {
    try {
        const shopData = await getIndexCategoryList();
        res.json(shopData);
    } catch (err) {
        next(err);
    }
})
// 主界面shop路由
app.get('/index/shop', async (req, res, next) => {
    let categoryID = req.query.categoryID;
    console.log(categoryID);
    try {
        const categoryData = await getIndexShopList(categoryID);
        res.json(categoryData);
    } catch (err) {
        next(err);
    }
})
app.get('/index/tag', async (req, res, next) => {
    let shopID = req.query.shopID;
    console.log(shopID);
    try {
        const tagData = await getTag(shopID);
        res.json(tagData);
    } catch (err) {
        next(err);
    }
})


// 500界面
app.use((err, req, res, next) => {
    res.status(500).send({ error: err.message });
});



httpsServer.listen(PORT, () => {
    console.log("server running at port ", PORT)
})