// 后台系统
// 登录api

const mysql = require('mysql');
const { MYSQL_CONFIG } = require('./config/config');


// 创建链接mysql
const connection = mysql.createConnection(MYSQL_CONFIG);

// 开始连接
connection.connect()

// get role
function getRole() {
  let sql = `select user.userID,user.account,user.nickname,group_concat(user_role.roleID) as roleID,group_concat(role.rolename) as rolename from user left join user_role on user.userID=user_role.userID left join role on user_role.roleID=role.roleID  group by user.userID limit 20;`
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



// addrole，
function addRole(userID, roleID) {
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





module.exports = { getRole, deleteRole, addRole };