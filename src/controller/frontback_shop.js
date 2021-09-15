// shop基本信息 模块
const { nanoid } = require('nanoid');
const { getShop, deleteShop, updateShop, addShop } = require('../db/frontback_shop');
const { deleteShopTag, addShopTag } = require('../db/frontback_shop_tag');
const { getGalary, addGalary, updateGalary, deleteGalary } = require('../db/galary');

//get
function dbGetShop(shopID) {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await getShop(shopID);
      result = result.map(item => {
        if (item.tagname) {
          item.tagname = item.tagname.split(',');
          item.tagname = Array.from(new Set(item.tagname));
        }
        if (item.tagID) {
          item.tagID = item.tagID.split(',').map(i => parseInt(i));
          // 投机取巧，去重
          item.tagID = Array.from(new Set(item.tagID));
        }
        if (item.imageurl) {
          item.imageurl = item.imageurl.split(',');
          item.imageurl = Array.from(new Set(item.imageurl));

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
      let { tagID, galaryImageUrls } = data;
      let shopID = nanoid(11);
      let createdate = Date.now();// 13位数timestamp
      data = { shopID: shopID, createdate: createdate, ...data }
      await addShop(data);
      // 数据库的shop_tag表，添加标签数据
      let tagPromiseAll = tagID.map(item => addShopTag(shopID, item));
      // 数据库的galary表，添加数据
      let galaryPromiseAll = galaryImageUrls.map(item => addGalary(shopID, item));
      await Promise.all([...tagPromiseAll, ...galaryPromiseAll]);
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