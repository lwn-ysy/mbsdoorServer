// account账户模块

// const nanoid = require('nanoid');// 随机数生成
const { nanoid } = require('nanoid')
const { getAccount, addAccount, updadteAccount, deleteAccount } = require('../db/frontback_account');

//get
function dbGetAccount() {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await getAccount();
      resolve(result);
    } catch (error) {
      reject(error);
    }
  })
}


// add
function dbAddAccount(data) {
  return new Promise(async (resolve, reject) => {
    try {
      data.userID = nanoid();// 随机生成一个userID
      await addAccount(data);
      resolve();
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
      resolve();
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
      resolve();
    } catch (error) {
      reject(error);
    }
  })
}


module.exports = {
  dbGetAccount, dbDeleteAccount, dbAddAccount, dbUpdateAccount
}