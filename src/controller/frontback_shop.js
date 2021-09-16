// shop基本信息 模块
const { nanoid } = require('nanoid');
const { getShop, deleteShop, updateShop, addShop } = require('../db/frontback_shop');
const { deleteShopTag, addShopTag } = require('../db/frontback_shop_tag');
const { dbDeleteGalary, dbAddGalary } = require('../controller/galary')

//get
function dbGetShop(data) {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await getShop(data);
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

// add
function dbAddShop(data) {
  return new Promise(async (resolve, reject) => {
    try {
      let { tagID, imageurl } = data;
      let shopID = nanoid(11);
      data.shopID = shopID;
      let createdate = Date.now();// 13位数timestamp
      data = { createdate: createdate, ...data }
      await addShop(data);
      // 数据库的shop_tag表，添加标签数据
      let tagPromiseAll = tagID.map(_tagID => addShopTag(shopID, _tagID));
      // 数据库的galary表，添加数据
      let galaryPromiseAll = imageurl.map(_imageurl => dbAddGalary(shopID, _imageurl));
      await Promise.all([...tagPromiseAll, ...galaryPromiseAll]);
      resolve();
    } catch (error) {
      reject(error);
    }
  })
}

// update
// shop_tag,galary，都是先删除所有然后添加，如果数据量大的话即要删除的东西很多，影响性能
// 投机取巧，待优化
function dbUpdateShop(data) {
  return new Promise(async (resolve, reject) => {
    try {
      let { tagID, shopID, imageurl } = data;
      await updateShop(data);

      // 数据库的shop_tag表，添加标签数据
      await deleteShopTag(shopID);
      let promiseAll = tagID.map(_tagID => addShopTag(shopID, _tagID));

      // 数据库的galary表，添加数据
      await dbDeleteGalary(shopID);
      let imageurlPromiseAll = imageurl.map(_imageurl => dbAddGalary(shopID, _imageurl));

      await Promise.all([...promiseAll, ...imageurlPromiseAll]);
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
      await dbDeleteGalary(shopID);
      resolve();
    } catch (error) {
      reject(error);
    }
  })
}


module.exports = {
  dbGetShop, dbDeleteShop, dbUpdateShop, dbAddShop
}