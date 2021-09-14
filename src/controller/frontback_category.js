// category 标签模块

const { getCategory, addCategory, updateCategory, deleteCategory } = require('../db/frontback_category');

//get
function dbGetCategory() {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await getCategory();
      resolve(result);
    } catch (error) {
      reject(error);
    }
  })
}


// add
function dbAddCategory(data) {
  return new Promise(async (resolve, reject) => {
    try {
      await addCategory(data);
      resolve();
    } catch (error) {
      reject(error);
    }
  })
}



// update
function dbUpdateCategory(data) {
  return new Promise(async (resolve, reject) => {
    try {
      await updateCategory(data);
      resolve();
    } catch (error) {
      reject(error);
    }
  })
}


// delete
function dbDeleteCategory(categoryID) {
  return new Promise(async (resolve, reject) => {
    try {
      await deleteCategory(categoryID);
      resolve();
    } catch (error) {
      reject(error);
    }
  })
}


module.exports = {
  dbGetCategory, dbDeleteCategory, dbAddCategory, dbUpdateCategory
}