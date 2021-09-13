// 后台系统
// 登录api

const mysql = require('mysql');
const { MYSQL_CONFIG } = require('./config/config');


// 创建链接mysql
const connection = mysql.createConnection(MYSQL_CONFIG);

// 开始连接
connection.connect()

// 需要操作两个表role和account
// get role
function getRole(userID) {
  let sql = `select * from mbsdoor.role where userID='${userID}'`;
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err || !result) {
        reject(err);
        return;
      }
      let roles = result.map(item => item.role);
      resolve(roles);
    })
  })
}

// get Account
function getAccount() {
  let sql = `select * from mbsdoor.user limit 20`;
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err || !result) {
        reject(err);
        return;
      }
      resolve(result);
    })
  })
}




// delete role
function deleteRole(userID) {
  let sql = `delete from mbsdoor.user_role where userID='${userID}'`;
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
// delete Account
function deleteAccount(userID) {
  let sql = `delete from mbsdoor.user where userID='${userID}'`;
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



// 增加权限role
function addRole(userID, role) {
  let sql = `insert into mbsdoor.user_role (userID,role) values ('${userID}','${role}')`;
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
// post增加Account
function addAccount(data) {
  let { userID, account, password, nickname, introduction } = data;
  let sql = `insert into mbsdoor.user (userID,account,password,nickname,introduction) values ('${userID}','${account}','${password}','${nickname}','${introduction}')`;
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



// 更新role
function updateRole(userID, role) {
  let sql = `update mbsdoor.user_role set role='${role}' where userID='${userID}'`;
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
// put修改Account
function updadteAccount(data) {
  let { userID, password, nickname, introduction } = data;
  let sql = `update mbsdoor.user set password='${password}',nickname='${nickname}',introduction='${introduction}' where userID='${userID}'`;
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




module.exports = { getAccount, addAccount, updadteAccount, deleteAccount, getRole, deleteRole, addRole, updateRole };