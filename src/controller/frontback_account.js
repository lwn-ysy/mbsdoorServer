// account账户模块

// const nanoid = require('nanoid');// 随机数生成
const { nanoid } = require('nanoid')
const { getAccount, addAccount, updadteAccount, deleteAccount, getRole, deleteRole, addRole, updateRole } = require('../db/frontback_account');

//get
function dbGetAccount() {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await getAccount();
      let promiseArry = result.map(item => getRole(item.userID));
      let data = await Promise.all(promiseArry);
      let res = result.map((item, index) => {
        item.roles = data[index];
        return item;
      })
      resolve(res);
    } catch (error) {
      reject(error);
    }
  })
}


// add
function dbAddAccount(data) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.roles) {// 必须有roles才进行addRoles
        reject(new Error('前端传送的数据没有roles'))
      }
      let userID = nanoid();// 随机生成一个userID
      data.userID = userID;
      await addAccount(data);
      let PromiseArry = data.roles.map(role => addRole(userID, role));
      await Promise.all(PromiseArry);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  })
}



// update
function dbUpdateAccount(data) {
  return new Promise(async (resolve, reject) => {
    try {
      await updadteAccount(data);
      console.log(data.roles)
      if (data.roles && data.userID) {// 有则updateRole，无则跳过
        await deleteRole(data.userID)// 暴力解法，先删除所有roles，再增加;后期可以以哪些是新增、哪些是去除的来优化
        let PromiseArry = data.roles.map(role => addRole(data.userID, role));
        await Promise.all(PromiseArry);
      }
      resolve(true);
    } catch (error) {
      reject(error);
    }
  })
}


// delete
function dbDeleteAccount(userID) {
  return new Promise(async (resolve, reject) => {
    try {
      await deleteAccount(userID);
      await deleteRole(userID);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  })
}


module.exports = {
  dbGetAccount, dbDeleteAccount, dbAddAccount, dbUpdateAccount
}