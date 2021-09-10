// 后台系统
// 登录api

const e = require('express');
const mysql = require('mysql');
const { MYSQL_CONFIG } = require('./config/config');


// 创建链接mysql
const connection = mysql.createConnection(MYSQL_CONFIG);

// 开始连接
connection.connect()

// 查询user表的账号密码-->验证用户登录
function validateUserLogin(account, password) {
    let sql = `select * from mbsdoor.user where account="${account}" and password="${password}"`;
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


// 验证token
// 目前token就是userID，把验证token和获取用户信息分开，方便以后开发更改token验证方式
function validateToken(token) {
    let sql = `select * from mbsdoor.user where userID="${token}"`
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err || !result) {
                reject(err);
                return;
            }
            if (result.length === 1) {
                resolve(true);
            } else {
                resolve(false);
            }
        })
    })
}

// 查询user表的用户基本信息-->
function getUserInfo(userID) {
    let sql = `select * from mbsdoor.user where userID="${userID}"`
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

// 查询user_permission表的用户权限role
function getRoles(userID) {
    let sql = `select user_role.userID,group_concat(role.rolename) as roles from user_role left join role on user_role.roleID=role.roleID where user_role.userID='${userID}' group by user_role.userID;
    `;
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err || !result) { // 如果有报错或者数据库连接有问题返回undefined
                reject(err);
                return;
            }
            resolve(result);
        })
    })
}

module.exports = { validateUserLogin, getUserInfo, getRoles, validateToken };