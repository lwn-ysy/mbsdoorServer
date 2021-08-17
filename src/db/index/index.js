// 数据库处理

const mysql = require('mysql');
const { MYSQL_CONFIG } = require('../config');


// 创建链接mysql
const connection = mysql.createConnection(MYSQL_CONFIG);

// 开始连接
connection.connect()



// [1] index界面 轮播图数据
function getIndexBannerlist() {
    // sql语句
    let sql = `select * from banner where hidden=0 `;
    let promise = new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(result);
        })
    })
    return promise;
}

// [2] index界面 标签数据
function getIndexCategoryList() {
    // sql语句
    let sql = `select * from category `;
    let promise = new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(result);
        })
    })
    return promise;
}

// 点赞的number，数据库查询,用于getShopList_dianzan
function getZanCount(shopListItem, shopID, oepnID) {
    let sql = `select count(1) from mbsdoor.dianzan where shopID='${shopID}'`;
    let sql_isDianzan = `select * from mbsdoor.dianzan where shopID='${shopID}' and openID='${oepnID}' `
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            // 处理数据
            let count = result[0]['count(1)'];
            shopListItem.dianzan = count;
            connection.query(sql_isDianzan, (er_1, res_1) => {
                if (er_1) {
                    reject(er_1);
                }
                let isDianzan = res_1.length === 1 ? true : false;
                shopListItem.isDianzan = isDianzan;
                resolve(shopListItem);
            })
        })
    })
}


//[3.1] index界面 shop图片数据,参数是number类型，唯一值;offset偏移值，

function getShopList_dianzan(categoryID, offset = 0,openID) {
    let sql = `select * from mbsdoor.shop where categoryID=${parseInt(categoryID)} order by shopID limit 5 offset ${offset}`;
    let promise = new Promise(async (resolve, reject) => {
        connection.query(sql, async (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            // 遍历result,根据shopID查询dianzan数据表
            let _arry = [];
            result.forEach(item => {
                let _promise = getZanCount(item, item.shopID, openID);
                _arry.push(_promise);
            })
            await Promise.all(_arry).then(res => {
                resolve(res);
            })
        })

    })
    return promise;
}


// 辅助性函数，查询是否已收藏
function getCollect(openID, shopID, shopList) {
    let sql = `select count(1) from mbsdoor.collect where openID='${openID}' and shopID='${shopID}' `;
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            let isCollected = result[0]['count(1)'] === 1 ? true : false;

            shopList.isCollected = isCollected;
            resolve(shopList);
        })
    })

}

// [3.2] 给shop图片数据，增加收藏数据
// 参数是个数组，必须有shopID属性
function getShopList_collect(shopList, openID) {
    return new Promise((resolve, reject) => {
        try {
            let _arry = [];
            shopList.forEach(item => {
                let shopID = item.shopID;
                let _promise = getCollect(openID, shopID, item);
                _arry.push(_promise);
            })
            Promise.all(_arry).then(res => {
                resolve(res);
            })
        } catch (error) {
            reject(error);
        }

    })
}

module.exports = { getIndexBannerlist, getIndexCategoryList, getShopList_dianzan, getShopList_collect };