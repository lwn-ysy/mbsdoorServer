// 图片集 

const { getBlog, getSearchBlog } = require('../db/blog');
const dayjs = require('dayjs');

//get
function dbGetBlog(offset) {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await getBlog(offset);
      result = result.map(item => {
        item.date = dayjs(parseInt(item.date)).format('YYYY-MM-DD');
        item.imageurls = item.imageurls ? item.imageurls.split(',') : [];
        item.miniImageUrls = item.miniImageUrls ? item.miniImageUrls.split(',') : [];
        return item;
      })
      resolve(result);
    } catch (error) {
      reject(error);
    }
  })
}


//get
function DbGetSearchBlog(data) {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await getSearchBlog(data);
      result = result.map(item => {
        item.date = dayjs(parseInt(item.date)).format('YYYY-MM-DD');
        item.imageurls = item.imageurls ? item.imageurls.split(',') : [];
        item.miniImageUrls = item.miniImageUrls ? item.miniImageUrls.split(',') : [];
        return item;
      })
      resolve(result);
    } catch (error) {
      reject(error);
    }
  })
}


module.exports = {
  dbGetBlog, DbGetSearchBlog
}