const express = require('express')
const router = express.Router();
const { getPersonalShopList } = require('../../db/personal/personal');

//  personal界面的，路由处理

router.get('/collect', async (req, res, next) => {
    let userID = req.query.userID;
    let table = req.query.table;// table = collect or history
    try {
        let collectShopListdata = await getPersonalShopList(userID, table);
        res.json(collectShopListdata);
    } catch (err) {
        next(err)
    }
})



module.exports = router;