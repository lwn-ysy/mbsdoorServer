const express = require('express')
const router = express.Router();

const { getShopData } = require('../db/show');


router.get('/shop', async (req, res, next) => {
    let { openID, shopID } = req.query;
    try {
        let shopData = await getShopData(shopID, openID);
        res.json(shopData);
    } catch (error) {
        next(error);
    }

})


module.exports = router;