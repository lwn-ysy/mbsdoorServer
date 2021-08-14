const express = require('express');
const router = express.Router();
const { getIndexBannerlist, getIndexCategoryList, getIndexShopList } = require('../../db/index/index');


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
    let categoryID = req.query.categoryID;
    let offset = req.query.offset;
    try {
        const categoryData = await getIndexShopList(categoryID, offset);
        res.json(categoryData);
    } catch (err) {
        next(err);
    }
})

// index界面
router.get('/index/tag', async (req, res, next) => {
    let shopID = req.query.shopID;
    console.log(shopID);
    try {
        const tagData = await getTag(shopID);
        res.json(tagData);
    } catch (err) {
        next(err);
    }
})
module.exports = router;