const express = require('express')
const router = express.Router();
const { getPersonalShopList, getCollect, changeCollect } = require('../../db/personal/personal');

//  personal界面的，路由处理

// 获取收藏和历史的所有数据,包括shop_id数据
router.get('/collectlist', async (req, res, next) => {
    let openID = req.query.openID;
    let table = req.query.table;// table = collect or history
    try {
        let collectShopListdata = await getPersonalShopList(openID, table);
        res.json(collectShopListdata);
    } catch (err) {
        next(err)
    }
})
// 获取收藏的shop_id数据，用于是否标亮收藏icon
router.get('/collect', async (req, res, next) => {
    let openID = req.query.openID;
    let table = 'collect';
    try {
        let collectData = await getCollect(openID, table);
        res.json(collectData);
    } catch (error) {
        next(error);
    }
})
// 修改,有则删除，无责增加
router.post('/collect', async (req, res, next) => {
    let openID = req.body.openID;
    let shopID = req.body.shopID;
    let table = 'collect';
    console.log("data:", req.body);
    await changeCollect(openID, shopID, table);

    // 重新查询，返回新数据
    try {
        let collectData = await getCollect(openID, table);
        res.json(collectData);
    } catch (error) {
        next(error);
    }

})



module.exports = router;