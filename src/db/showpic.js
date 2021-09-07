// personal界面的，数据库处理

const mysql = require('mysql');
const { MYSQL_CONFIG } = require('./config/config')

// 创建链接mysql
const connection = mysql.createConnection(MYSQL_CONFIG);
// 开始连接
connection.connect();

// 获取pictureUrl
function getPictureUrl(shopID) {
    return new Promise((resolve, reject) => {
        let sql = `select * from mbsdoor.pictureurl where shopID='${shopID}'`
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            }
            let _arry = [];
            result.forEach(item => {
                _arry.push(item.pictureurl);
            });
            resolve({ urlList: _arry });
        })
    })
};
// 获取shopDetail
function getShopDetail(shopID, shopData) {
    return new Promise((resolve, reject) => {
        let sql = `select * from mbsdoor.shopdetail where shopID='${shopID}'`
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            }
            shopData.shopDetail = result[0];
            resolve(shopData);
        })
    })
};

// 获取是否点赞
function getIsDianzan(shopID, openID, shopData) {
    return new Promise((resolve, reject) => {
        let sql = `select * from mbsdoor.dianzan where shopID='${shopID}' and openID='${openID}'`;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            }
            shopData.isDianzan = result.length === 1 ? true : false;
            resolve(shopData);
        })
    })
};

// 获取点赞数量
function getDianzanCount(shopID, shopData) {
    return new Promise((resolve, reject) => {
        let sql = `select count(1) from mbsdoor.dianzan where shopID='${shopID}'`;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            }
            shopData.dianzanCount = result[0]['count(1)'];
            resolve(shopData);
        })
    })
};

// 获取是否收藏
function getIsCollected(shopID, openID, shopData) {
    return new Promise((resolve, reject) => {
        let sql = `select * from mbsdoor.collect where shopID='${shopID}' and openID='${openID}'`;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            }
            shopData.isCollected = result.length === 1 ? true : false;
            resolve(shopData);
        })
    })
};

// 获取shop表单的数据

function getShopList(shopID, shopData) {
    return new Promise((resolve, reject) => {
        let sql = `select * from mbsdoor.shop where shopID='${shopID}' `;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error);
            }
            shopData.shopList = result[0];
            resolve(shopData);
        })
    })
};

// 获取所有的数据
function getShopData(shopID, openID) {
    return new Promise(async (resolve, reject) => {
        let data_pictureUrl = await getPictureUrl(shopID);
        let data_shopDetail = await getShopDetail(shopID, data_pictureUrl);
        let data_isDianzan = await getIsDianzan(shopID, openID, data_shopDetail);
        let data_dianzanCount = await getDianzanCount(shopID, data_isDianzan);
        let data_isCollected = await getIsCollected(shopID, openID, data_dianzanCount);
        let data_shopList = await getShopList(shopID, data_isCollected);
        resolve(data_shopList)
    })
}

module.exports = {
    getShopData
}