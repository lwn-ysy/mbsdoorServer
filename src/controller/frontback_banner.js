// banner 模块

const { getBanner, deleteBanner, updateBanner, addBanner } = require('../db/frontback_banner');

//get
function dbGetBanner() {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await getBanner();
      result = result.map(item => {
        item.hidden = item.hidden === 0 ? false : true;
        return item;
      })
      resolve(result);
    } catch (error) {
      reject(error);
    }
  })
}


function dbAddBanner(data) {
  return new Promise(async (resolve, reject) => {
    try {
      await addBanner(data);
      resolve();
    } catch (error) {
      reject(error);
    }
  })
}

// update
// 这里取个巧，先删除所有的，再增加新的
// roleID是个数组
function dbUpdateBanner(data) {
  return new Promise(async (resolve, reject) => {
    try {
      await updateBanner(data);
      resolve();
    } catch (error) {
      reject(error);
    }
  })
}


// delete
function dbDeleteBanner(bannerID) {
  return new Promise(async (resolve, reject) => {
    try {
      await deleteBanner(bannerID);
      resolve();
    } catch (error) {
      reject(error);
    }
  })
}


module.exports = {
  dbGetBanner, dbDeleteBanner, dbUpdateBanner, dbAddBanner
}