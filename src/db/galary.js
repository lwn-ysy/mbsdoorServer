// 后台系统
// 图片集，用于存储商品浏览图片

const mysql = require('mysql');
const { MYSQL_CONFIG } = require('./config/config');


// 创建链接mysql
const connection = mysql.createConnection(MYSQL_CONFIG);

// 开始连接
connection.connect()


// get 
function getGalary(shopID) {
  let sql = undefined;
  if (shopID) {
    sql = `select shopID,group_concat(imageurl) as imageurl from mbsdoor.galary where shopID='${shopID}' group by shopID`;
  } else {
    sql = `select shopID,group_concat(imageurl) as imageurl from mbsdoor.galary group by shopID`;
  }
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




// delete 
function deleteGalary(shopID) {
  let sql = `delete from mbsdoor.galary where shopID='${shopID}'`;
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


// add
function addGalary(shopID, imageurl) {
  let sql = `insert into mbsdoor.galary (shopID,imageurl) values ('${shopID}','${imageurl}')`;
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




// put
function updateGalary(shopID, imageurl) {
  let sql = `update mbsdoor.galary set imageurl='${imageurl}' where shopID='${shopID}'`;
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




module.exports = { getGalary, addGalary, updateGalary, deleteGalary };