// 特殊表格操作，存放一些特殊查询，比如统计

const mysql = require('mysql');
const { MYSQL_CONFIG } = require('./config/config');


// 创建链接mysql
const connection = mysql.createConnection(MYSQL_CONFIG);

// 开始连接
connection.connect()


// get 
function getBlog(offset) {
  let sql = `SELECT blog.*,group_concat(blog_imageurl.imageurl) as imageurls,group_concat(blog_imageurl.miniImageUrl) as miniImageUrls FROM mbsdoor.blog
  left join blog_imageurl on blog.blogID=blog_imageurl.blogID
  group by blog.blogID
  limit 5
  offset ${offset};`;
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    })
  })
}

function getSearchBlog(data) {
  let { key } = data;
  let sql = `SELECT blog.*,group_concat(blog_imageurl.imageurl) as imageurls,group_concat(blog_imageurl.miniImageUrl) as miniImageUrls FROM mbsdoor.blog
  left join blog_imageurl on blog.blogID=blog_imageurl.blogID
  where address like '%${key}%' or content like '%${key}%'
  group by blog.blogID`;
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    })
  })
}


module.exports = { getBlog, getSearchBlog };