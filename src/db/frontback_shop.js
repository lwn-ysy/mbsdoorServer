// 商品系统
// 登录api

const mysql = require('mysql');
const { MYSQL_CONFIG } = require('./config/config');


// 创建链接mysql
const connection = mysql.createConnection(MYSQL_CONFIG);

// 开始连接
connection.connect()





// delete shop_tag
// 删除shop_tag映射表的shopID对应的tagID
function deleteShopTag(shopID) {
  let sql = `delete from mbsdoor.shop_tag where shopID='${shopID}'`;
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    })
  })
}

// add shop_tag
// 添加shop_tag映射表的shopID对应的tagID
function addShopTag(shopID, tagID) {
  let sql = `insert into mbsdoor.shop_tag (shopID,tagID) values ('${shopID}',${tagID})`;
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    })
  })
}



// get 
function getShop() {
  let sql = `SELECT shop.shopID,shop.coverPicUrl,shop.des,shop.isFull,shop.title,category.categoryname,category.categoryID,group_concat(tag.tagname) as tagname,group_concat(shop_tag.tagID) as tagID FROM shop left join category on shop.categoryID=category.categoryID left join shop_tag on shop.shopID=shop_tag.shopID left join tag on shop_tag.tagID=tag.tagID group by shop.shopID limit 20;`
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      if (!result) {
        reject(new Error('连接数据失败'));
        return;
      }
      resolve(result);
    })
  })
}




// delete shop
// TODO：若数据库中没有此shopID，也会提示删除成功，
// 所以是否需要先查询，是否存在？
function deleteShop(shopID) {
  let sql = `delete from mbsdoor.shop where shopID='${shopID}'`;
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err || !result) {
        reject(err);
        return;
      }
      resolve();
    })
  })
}



// update 
function updateShop(data) {
  let { shopID, categoryID, des, coverPicUrl, title } = data;
  if (!shopID) {
    Promise.reject('shopID不存在')
  }
  let sql = `update mbsdoor.shop set categoryID='${categoryID}',des='${des}',coverPicUrl='${coverPicUrl}',title='${title}' where shopID='${shopID}'`;
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err || !result) {
        reject(err || "mysql查询有误，可能是sql语句错误");
        return;
      }
      resolve();
    })
  })
}







// add，
function addShop(data) {
  let { shopID, categoryID, des, coverPicUrl, title } = data;
  let sql = `insert into mbsdoor.shop (shopID,categoryID,des,coverPicUrl,title) values ('${shopID}','${categoryID}','${des}','${coverPicUrl}','${title}')`;
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err || !result) {
        console.log(err)
        reject(err);
        return;
      }
      resolve();
    })
  })
}





module.exports = { getShop, deleteShop, updateShop, addShop, deleteShopTag, addShopTag };