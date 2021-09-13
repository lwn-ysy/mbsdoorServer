// 后台系统
// tag 标签

const mysql = require('mysql');
const { MYSQL_CONFIG } = require('./config/config');


// 创建链接mysql
const connection = mysql.createConnection(MYSQL_CONFIG);

// 开始连接
connection.connect()


// get 
function getTag() {
  let sql = `select * from mbsdoor.tag `;
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
function deleteTag(tagID) {
  let sql = `delete from mbsdoor.tag where tagID='${tagID}'`;
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
function addTag(data) {
  let { tagname } = data;
  let sql = `insert into mbsdoor.tag (tagname) values ('${tagname}')`;
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
function updateTag(data) {
  let { tagID, tagname } = data;
  let sql = `update mbsdoor.tag set tagname='${tagname}' where tagID='${tagID}'`;
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




module.exports = { getTag, addTag, updateTag, deleteTag };