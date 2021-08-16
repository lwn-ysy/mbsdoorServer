// personal界面的，数据库处理

const mysql = require('mysql');
const { MYSQL_CONFIG } = require('../config')

// 创建链接mysql
const connection = mysql.createConnection(MYSQL_CONFIG);
// 开始连接
connection.connect();


// [1]先获取collect收藏or history表里的shop_id数据
function getCollect(openID, table) {
    let sql = `select * from mbsdoor.${table} where openID='${openID}'`;
    let promise = new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (!result) {
                console.log('getCollect里的result出错：', result)
                reject("连接数据库问题，可能语句错误或者未连上，查询不成功，返回undefine");
            }
            if (err) {
                reject(err);
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

// 改变collect or history表里的数据，
// 先查询，如果没有就增加，有的话就删除
function changeCollect(openID, shopID, table) {
    let get_sql = `select * from mbsdoor.${table} where openID='${openID}' and shopID='${shopID}'`;
    let delete_sql = `delete  from mbsdoor.${table} where openID='${openID}' and shopID='${shopID}'`;
    let insert_sql = `insert  into mbsdoor.${table} (openID, shopID) values ('${openID}', '${shopID}')`;
    return new Promise((resolve, reject) => {
        connection.query(get_sql, (err, result) => {
            if (!result) {
                reject("连接数据库问题，可能语句错误或者未连上，查询不成功，返回undefine");
            }
            console.log("changeCollect查询返回的数据：",result);
            if (result.length > 0) {
                connection.query(delete_sql, (err, res) => {
                    resolve();
                });// 有则删除
            } else {
                connection.query(insert_sql, (err, res) => {
                    resolve()
                });// 无则增加
            };
            resolve();
        })
    })
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
// 第一个参数是用户openID，第二个是区分来自历史记录还是收藏（目前对应history,collect两个表
async function getPersonalShopList(openID, table) {
    let shopID_arry = await getCollect(openID, table);
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
    getPersonalShopList, getCollect, changeCollect
}