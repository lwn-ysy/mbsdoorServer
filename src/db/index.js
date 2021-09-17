// 数据库处理

const mysql = require('mysql');
const { MYSQL_CONFIG } = require('./config/config');


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
function getZanCount(shopList, shopID, oepnID) {
    let sql = `select count(dianzanID) as dianzan from mbsdoor.dianzan where shopID='${shopID}'`;
    let sql_isDianzan = `select * from mbsdoor.dianzan where shopID='${shopID}' and openID='${oepnID}' `
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            // 处理数据
            shopList.dianzan = result[0].dianzan;
            shopList.tags = shopList.tags.split(',');
            connection.query(sql_isDianzan, (er_1, res_1) => {
                if (er_1) {
                    reject(er_1);
                }
                let isDianzan = res_1.length === 1 ? true : false;
                shopList.isDianzan = isDianzan;
                resolve(shopList);
            })
        })
    })
}


//[3.1] index界面 shop图片数据,参数是number类型，唯一值;offset偏移值，

function getShopList_dianzan(categoryID, offset = 0, openID) {
    let sql = `select shop.shopID,shop.coverPicUrl,shop.des,shop.isFull,shop.title,group_concat(tag.tagname) as tags from mbsdoor.shop
    left join shop_tag on shop.shopID=shop_tag.shopID
    left join tag on shop_tag.tagID=tag.tagID
    where categoryID=${parseInt(categoryID)}
    group by shop.shopID 
    order by shop.shopID 
    limit 5 
    offset ${offset}`;
    let promise = new Promise((resolve, reject) => {
        connection.query(sql, async (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            //遍历result,根据shopID查询dianzan数据表
            let promiseAll = result.map(shopList => getZanCount(shopList, shopList.shopID, openID));
            let shopLists = await Promise.all(promiseAll);
            resolve(shopLists)
        })

    })
    return promise;
}


// 辅助性函数，查询是否已收藏
function getCollect(openID, shopID, shopList) {
    let sql = `select count(id) from mbsdoor.collect where openID='${openID}' and shopID='${shopID}' `;
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            let isCollected = result[0]['count(id)'] === 1 ? true : false;

            shopList.isCollected = isCollected;
            resolve(shopList);
        })
    })

}


// [3.2] 给shop图片数据，增加收藏数据
// 参数是个数组，必须有shopID属性
// TODO: 后期需要改，这算法访问数据库次数太多。
// 改为：先查询用户所有收藏的数据，然后用includes()判断
function getShopList_collect(shopLists, openID) {
    return new Promise((resolve, reject) => {
        let sql = `select group_concat(shopID) as list from mbsdoor.collect where openID='${openID}'`;
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return;
            }

            try {
                // 属性不存在，try/catch捕捉不到错误
                // 如果查询没有数据，esult[0].list 值为null，是没有split方法的，报错，
                let collectedList = [];
                if (result[0].list) {
                    collectedList = result[0].list.split(',');
                }
                shopLists = shopLists.map(shopList => {
                    shopList.isCollected = collectedList.includes(shopList.shopID);
                    return shopList;
                })
                resolve(shopLists)
            } catch (error) {
                reject(error);
            }

        })
    })
}

module.exports = { getIndexBannerlist, getIndexCategoryList, getShopList_dianzan, getShopList_collect };