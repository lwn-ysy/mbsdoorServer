// 数据处理功能模块

const { validateUserLogin, getUserInfo, getUserRoles, validateToken } = require('../db/frontback_login');



// /vue-admin-template/user/login
//验证用户登录
function dbValidateUserLogin(account, password) {
  return new Promise(async (resolve, reject) => {
    try {
      let isValidate = await validateUserLogin(account, password);
      if (isValidate.length === 1) {
        // 用户验证通过
        resolve({ isValidate: true, token: isValidate[0]['userID'] });
      } else {
        resolve({ isValidate: false, message: '账号或者密码错误' });
      }
    } catch (error) {
      reject(error);
    }

  })
}



// /vue-admin-template/user/info 
// 获取用户信息
function dbGetUserInfo(token) {
  return new Promise(async (resolve, reject) => {
    try {
      let isValidate = await validateToken(token);
      if (isValidate) {
        let [infoResult] = await getUserInfo(token);
        let permissionResult = await getUserRoles(infoResult.userID);
        infoResult.roles = permissionResult.map(item => item.role);
        resolve({ isValidate: true, result: infoResult });
      } else {
        resolve({ isValidate: false, message: "token无效" });
      }
    } catch (error) {
      reject(error);
    }
  })
}


module.exports = {
  dbGetUserInfo, dbValidateUserLogin
}