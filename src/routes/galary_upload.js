/*
** 操作图片集上传界面的路由
 */

const express = require('express');
const router = express.Router();
// form包括图片解析库
const formidable = require('formidable')
const fs = require('fs');


// 图片集合的api,前端传送form-data数据格式
router.post('/galary', (req, res, next) => {
  try {
    let form = new formidable({
      keepExtensions: true,
      uploadDir: './static/image/shop/',
      multiples: true
    });
    form.parse(req, (err, fields, files) => {// files.file字段是由前端传送过来的
      if (err) {
        next(err);
      }
      if (!files.file) {
        next(new Error("图片上传失败，图片数据字段应是file"));
      }
      // const host = "http://localhost:5000/";
      const host = "https://mbsdoor.com:5000/";

      // 本地路径，用于删除
      // let localPath = files.file.path  static\image\shop\upload_1555f167ad51039a5357ed7dc2d1ee67.png;
      // 服务器地址，用于读取/存到数据库
      let servePath = host + files.file.path.replace(/\\/g, '/');
      res.json({ code: 20000, data: servePath })
    })
  } catch (error) {
    next(error)
  }
})
// 图片集合的api,前端传送json格式数据
router.delete('/galary', (req, res, next) => {
  // const host = "http://localhost:5000/";
  const host = "https://mbsdoor.com:5000/";
  let { servePath } = req.query;
  let localPath = servePath.replace(host, '')
  // TODO: unlink的查询地址是相对项目地址C:\Users\63195\Desktop\mbsServer> + path（这里是localPath） 查询的
  // "/image/shop/upload_225107548891ed9ead237f0b57f2d207.jpg"网页地址的/会自动转为本地地址的/（Linux文件地址）
  fs.unlink(localPath, (err) => {
    if (err) {
      next(err)
    } else {
      res.json({ code: 20000, data: "图片删除成功" })
    }
  });
})
module.exports = router;