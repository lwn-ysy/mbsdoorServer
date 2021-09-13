// tag 标签模块

const { getTag, addTag, updateTag, deleteTag } = require('../db/frontback_tag');

//get
function dbGetTag() {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await getTag();
      resolve(result);
    } catch (error) {
      reject(error);
    }
  })
}


// add
function dbAddTag(data) {
  return new Promise(async (resolve, reject) => {
    try {
      await addTag(data);
      resolve();
    } catch (error) {
      reject(error);
    }
  })
}



// update
function dbUpdateTag(data) {
  return new Promise(async (resolve, reject) => {
    try {
      await updateTag(data);
      resolve();
    } catch (error) {
      reject(error);
    }
  })
}


// delete
function dbDeleteTag(tagID) {
  return new Promise(async (resolve, reject) => {
    try {
      await deleteTag(tagID);
      resolve();
    } catch (error) {
      reject(error);
    }
  })
}


module.exports = {
  dbGetTag, dbDeleteTag, dbAddTag, dbUpdateTag
}