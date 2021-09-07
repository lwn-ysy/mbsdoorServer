// 后台系统
// 登录api

const e = require('express');
const mysql = require('mysql');
const { MYSQL_CONFIG } = require('./config/config');


// 创建链接mysql
const connection = mysql.createConnection(MYSQL_CONFIG);

// 开始连接
connection.connect()

// 验证用户登录
function validateUser(username, password) {
    let sql = `select id from mbsdoor.user_info where username="${username}" and password="${password}"`;
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            if (result?.length === 1) {
                // 用户验证通过
                resolve({ isValidate: true, token: result[0]['id'] });
            } else {
                resolve({ isValidate: false, message: '账号或者密码错误' });
            }
        })
    })
}

module.exports = { validateUser };