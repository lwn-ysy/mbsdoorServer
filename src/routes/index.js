const express = require('express');
const router = express.Router();
const { getIndexBannerlist, getIndexCategoryList, getShopList_dianzan, getShopList_collect } = require('../db/index');


// index界面的，路由处理

// index界面，banner路由
router.get('/banner', async (req, res, next) => {
    try {
        const bannerData = await getIndexBannerlist(); // return的是res数据，而不使用await，return的是promise
        res.json(bannerData);
    } catch (err) {
        next(err);
    }
})

// index界面，category路由
router.get('/category', async (req, res, next) => {
    try {
        const shopData = await getIndexCategoryList();
        res.json(shopData);
    } catch (err) {
        next(err);
    }
})

// index界面，shop路由
// 两个参数，第一个是category类目，
//第二个是位移,默认为0，用于sql语句中的offset参数
router.get('/shop', async (req, res, next) => {
    let {
        categoryID, offset, openID
    } = req.query;
    try {
        const shopList_dianzan = await getShopList_dianzan(categoryID, offset, openID);
        const shopList_collect = await getShopList_collect(shopList_dianzan, openID);
        res.json(shopList_collect);
    } catch (err) {
        next(err);
    }
})

// index界面
router.get('/index/tag', async (req, res, next) => {
    let shopID = req.query.shopID;
    try {
        const tagData = await getTag(shopID);
        res.json(tagData);
    } catch (err) {
        next(err);
    }
})
module.exports = router;