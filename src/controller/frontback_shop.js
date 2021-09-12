// shop基本信息 模块

const { getShop, deleteShop, updateShop, addShop } = require('../db/frontback_shop');

//get
function dbGetShop() {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await getShop();
      result = result.map(item => {
        if (item.tagname) {
          item.tagname = item.tagname.split(',');
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
      await addShop(data);
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
      await updateShop(data);
      resolve();
    } catch (error) {
      reject(error);
    }
  })
}


// delete
function dbDeleteShop(shopID) {
  return new Promise(async (resolve, reject) => {
    try {
      await deleteShop(shopID);
      resolve();
    } catch (error) {
      reject(error);
    }
  })
}


module.exports = {
  dbGetShop, dbDeleteShop, dbUpdateShop, dbAddShop
}