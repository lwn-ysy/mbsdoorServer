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
            }

            resolve(result);
        })
    })
    return promise;
}

//[3] index界面 shop图片数据,参数是number类型，唯一值;offset偏移值，
function getIndexShopList(categoryID, offset = 0) {
    let sql = `select * from mbsdoor.shop where categoryID=${parseInt(categoryID)} order by shopID limit 5 offset ${offset}`;
    let promise = new Promise(async (resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (!result) {
                reject("连接数据库问题，可能语句错误或者未连上，查询不成功，返回undefine");
            }
            if (err) {
                reject(err);
            }
            resolve(result);
        })

    })
    return promise;

}


// 获取tap表中的tapName字段
function getTag(shopID) {
    let sql = `select tagName from tag where shopID='${shopID}'`;
    let promise = new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
            }
            let tag = [];
            result.forEach(item => {
                tag.push(item.tagName);
            });
            console.log('tag:', tag);
            resolve(tag);
        })
    })
    return promise;

}

module.exports = { getIndexBannerlist, getIndexCategoryList, getIndexShopList, getTag };