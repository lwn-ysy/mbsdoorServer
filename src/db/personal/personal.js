// personal界面的，数据库处理

const mysql = require('mysql');
const { MYSQL_CONFIG } = require('../config')

// 创建链接mysql
const connection = mysql.createConnection(MYSQL_CONFIG);
// 开始连接
connection.connect();


// [1]先获取collect收藏表里的数据
function getCollect(userID, table) {
    let sql = `select * from mbsdoor.${table} where userID='${userID}'`;
    let promise = new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            let collectShopList = [];
            result.forEach(item => {
                collectShopList.push(item.shopID);
            });
            resolve(collectShopList);
        })
    })
    return promise;
}

// 获取单个shop数据的函数
function getShop(shopID) {
    let sql = `select * from mbsdoor.shop where shopID='${shopID}'`;
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        })
    })
}
// 获取所有shops数据的函数
// 第一个参数是用户userID，第二个是区分来自历史记录还是收藏（目前对应history,collect两个表
async function getPersonalShopList(userID, table) {
    let shopID_arry = await getCollect(userID, table);
    return new Promise((resolve, reject) => {
        try {
            let _arry = [];
            shopID_arry.forEach(item => {
                let _promise = getShop(item);
                _arry.push(_promise);
            })
            Promise.all(_arry).then(result => {
                result = result.map(item => {
                    return item[0];
                })
                resolve(result);
            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getPersonalShopList
}