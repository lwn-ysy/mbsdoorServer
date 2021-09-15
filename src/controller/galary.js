// 图片集 

const { getGalary, addGalary, updateGalary, deleteGalary } = require('../db/galary');

//get
function dbGetGalary(shopID) {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await getGalary(shopID);
      result = result.map(item => {
        item.imageurl = item.imageurl.split(',');
        return item;
      })
      resolve(result);
    } catch (error) {
      reject(error);
    }
  })
}


// add
function dbAddGalary(data) {
  let { shopID, imageurl } = data;
  return new Promise(async (resolve, reject) => {
    try {
      await addGalary(shopID, imageurl);
      resolve();
    } catch (error) {
      reject(error);
    }
  })
}



// update
function dbUpdateGalary(data) {
  let { shopID, imageurl } = data;
  return new Promise(async (resolve, reject) => {
    try {
      await updateGalary(shopID, imageurl);
      resolve();
    } catch (error) {
      reject(error);
    }
  })
}


// delete
function dbDeleteGalary(shopID) {
  return new Promise(async (resolve, reject) => {
    try {
      await deleteGalary(shopID);
      resolve();
    } catch (error) {
      reject(error);
    }
  })
}


module.exports = {
  dbGetGalary, dbDeleteGalary, dbAddGalary, dbUpdateGalary
}