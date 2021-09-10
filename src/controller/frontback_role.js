// role 权限模块

const { getRole, deleteRole, addRole } = require('../db/frontback_role');

//get
function dbGetRole() {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await getRole();
      result = result.map(item => {
        item.rolename = item.rolename ? item.rolename.split(',') : [];
        // "1,2,3"格式转为 元素是number的数组[1,2,3]
        item.roleID = item.roleID ? item.roleID.split(',').map(item => parseInt(item)) : [];
        return item;
      })
      resolve(result);
    } catch (error) {
      reject(error);
    }
  })
}




// update
// 这里取个巧，先删除所有的，再增加新的
// roleID是个数组
function dbUpdateRole(userID, roleID) {
  return new Promise(async (resolve, reject) => {
    try {
      await deleteRole(userID);
      // TODO:要求是并发，后面验证是并发，还是串发
      let promiseAll = roleID.map(item => addRole(userID, item));
      await Promise.all(promiseAll)
      resolve();
    } catch (error) {
      reject(error);
    }
  })
}


// delete
function dbDeleteRole(userID) {
  return new Promise(async (resolve, reject) => {
    try {
      await deleteRole(userID);
      resolve();
    } catch (error) {
      reject(error);
    }
  })
}


module.exports = {
  dbGetRole, dbUpdateRole, dbDeleteRole
}