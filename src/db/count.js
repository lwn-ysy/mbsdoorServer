// 特殊表格操作，存放一些特殊查询，比如统计

const mysql = require('mysql');
const { MYSQL_CONFIG } = require('./config/config');


// 创建链接mysql
const connection = mysql.createConnection(MYSQL_CONFIG);

// 开始连接
connection.connect()


// get 
function countShop() {
  let sql = `select count(shopID) as total from mbsdoor.shop `;
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




module.exports = { countShop };