const express = require('express')
const router = express.Router();

const { getShopData } = require('../db/showpic');


router.get('/shop', async (req, res, next) => {
    let { openID, shopID } = req.query;
    try {
        let shopData = await getShopData(shopID, openID);
        console.log('shopID:', shopID);
        res.json(shopData);
    } catch (error) {
        next(error);
    }

})


module.exports = router;