// shop_tag中间表的数据库操作


const mysql = require('mysql');
const { MYSQL_CONFIG } = require('./config/config');


// 创建链接mysql
const connection = mysql.createConnection(MYSQL_CONFIG);

// 开始连接
connection.connect()

// delete shop_tag
// 删除shop_tag映射表的shopID对应的tagID
function deleteShopTag(shopID) {
  let sql = `delete from mbsdoor.shop_tag where shopID='${shopID}'`;
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    })
  })
}

// add shop_tag
// 添加shop_tag映射表的shopID对应的tagID
function addShopTag(shopID, tagID) {
  let sql = `insert into mbsdoor.shop_tag (shopID,tagID) values ('${shopID}',${tagID})`;
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    })
  })
}

module.exports = { deleteShopTag, addShopTag };