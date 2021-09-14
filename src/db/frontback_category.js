// 后台系统
// catogory 品类

const mysql = require('mysql');
const { MYSQL_CONFIG } = require('./config/config');


// 创建链接mysql
const connection = mysql.createConnection(MYSQL_CONFIG);

// 开始连接
connection.connect()


// get 
function getCategory() {
  let sql = `select * from mbsdoor.category `;
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
function deleteCategory(categoryID) {
  let sql = `delete from mbsdoor.category where categoryID='${categoryID}'`;
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
function addCategory(data) {
  let { categoryname } = data;
  let sql = `insert into mbsdoor.category (categoryname) values ('${categoryname}')`;
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




// put修改Account
function updateCategory(data) {
  let { categoryID, categoryname } = data;
  let sql = `update mbsdoor.category set categoryname='${categoryname}' where categoryID='${categoryID}'`;
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




module.exports = { getCategory, addCategory, updateCategory, deleteCategory };