// shop基本信息 模块
const { nanoid } = require('nanoid');
const { getShop, deleteShop, updateShop, addShop, deleteShopTag, addShopTag } = require('../db/frontback_shop');

//get
function dbGetShop() {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await getShop();
      result = result.map(item => {
        if (item.tagname) {
          item.tagname = item.tagname.split(',');
        }
        if (item.tagID) {
          item.tagID = item.tagID.split(',').map(i => parseInt(i));
        }
        return item;
      })
      resolve(result);
    } catch (error) {
      reject(error);
    }
  })
}


function dbAddShop(data) {
  return new Promise(async (resolve, reject) => {
    try {
      let { tagID } = data;
      let shopID = nanoid(11);
      let createdate = Date.now();// 13位数timestamp
      data = { shopID: shopID, createdate: createdate, ...data }
      await addShop(data);
      let promiseAll = tagID.map(item => addShopTag(shopID, item));
      await Promise.all(promiseAll);
      resolve();
    } catch (error) {
      reject(error);
    }
  })
}

// update
function dbUpdateShop(data) {
  return new Promise(async (resolve, reject) => {
    try {
      let { tagID, shopID } = data;
      await updateShop(data);
      await deleteShopTag(shopID);
      let promiseAll = tagID.map(item => addShopTag(shopID, item));
      await Promise.all(promiseAll);
      resolve();
    } catch (err) {
      reject(err);
    }
  })
}


// delete
function dbDeleteShop(shopID) {
  return new Promise(async (resolve, reject) => {
    try {
      // 串行的，先删除shop表，再删shoptag表
      await deleteShop(shopID);
      await deleteShopTag(shopID);
      resolve();
    } catch (error) {
      reject(error);
    }
  })
}


module.exports = {
  dbGetShop, dbDeleteShop, dbUpdateShop, dbAddShop
}