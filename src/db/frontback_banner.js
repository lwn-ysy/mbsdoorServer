// 后台系统
// 登录api

const mysql = require('mysql');
const { MYSQL_CONFIG } = require('./config/config');


// 创建链接mysql
const connection = mysql.createConnection(MYSQL_CONFIG);

// 开始连接
connection.connect()

// get 
function getBanner() {
  let sql = `select * from mbsdoor.banner limit 20`
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      if (!result) {
        reject(new Error('连接数据失败'));
        return;
      }
      resolve(result);
    })
  })
}



// delete
function deleteBanner(bannerID) {
  let sql = `delete from mbsdoor.banner where bannerID='${bannerID}'`;
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err || !result) {
        reject(err);
        return;
      }
      resolve();
    })
  })
}
// update 
function updateBanner(data) {
  let { bannerID, type, description, picURL, hidden } = data;
  hidden = hidden === false ? 0 : 1; // mysql数据没有Boolean值，
  let sql = `update mbsdoor.banner set type='${type}',description='${description}',picURL='${picURL}',hidden=${hidden} where bannerID='${bannerID}'`;
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err || !result) {
        reject(err);
        return;
      }
      resolve();
    })
  })
}




// addrole，
function addBanner(userID, roleID) {
  let sql = `insert into mbsdoor.user_role (userID,roleID) value ('${userID}','${roleID}')`;
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err || !result) {
        reject(err);
        return;
      }
      resolve();
    })
  })
}





module.exports = { getBanner, updateBanner, deleteBanner, addBanner };