const express = require('express')
const router = express.Router();
const { getPersonalShopList, changeCollect, getZan, changeZan, deleteAllCollect } = require('../db/personal');

//  personal界面的，路由处理

// 获取收藏和历史的所有数据,包括shop_id数据
router.get('/collectlist', async (req, res, next) => {
    let { openID, table } = req.query;// table = collect or history
    try {
        let collectShopListdata = await getPersonalShopList(openID, table);
        res.json(collectShopListdata);
    } catch (err) {
        next(err)
    }
})

// 修改,有则删除，无责增加
router.post('/collect', async (req, res, next) => {
    let { openID, shopID, table = 'collect' } = req.body
    await changeCollect(openID, shopID, table);
    res.json();
})
// 删除所有收藏or历史
router.delete('/collect', async (req, res, next) => {
    let { openID, table = 'collect' } = req.body;
    try {
        await deleteAllCollect(openID, table);
        res.json('删除成功');

    } catch (error) {
        next(error);
    }

})

// 点赞的查询路由
router.get('/dianzan', async (req, res, next) => {
    let shopID = req.query.shopID;
    try {
        let countData = await getZan(shopID);
        res.json(countData);
    } catch (error) {
        next(error);
    }
})

// 点赞的增删路由
router.post('/dianzan', async (req, res, next) => {
    let {
        openID, shopID
    } = req.body;

    await changeZan(openID, shopID);


    //TODO: 实际上就是跳转到get方法的路由
    try {
        let countData = await getZan(shopID);
        res.json(countData);
    } catch (error) {
        next(error);
    }
})
module.exports = router;