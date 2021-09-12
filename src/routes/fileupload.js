const express = require('express');
const router = express.Router();
const { dbAddBanner } = require('../controller/frontback_banner');
// 引入formidable库
const formidable = require('formidable');
router.post('/', (req, res, next) => {
  try {
    // 配置
    let form = new formidable({
      keepExtensions: true,
      uploadDir: './static/image/banner/',
      multiples: true
    });


    // 解析
    form.parse(req, async (err, fields, files) => {
      if (err) {
        next(err);
      }
      const PATH = "https://mbsdoor.com:5000/static/image/banner/";
      let picURL = PATH + files.file.path.split('\\').slice(-1)[0];
      fields.picURL = picURL;

      // 数据库处理
      await dbAddBanner(fields)

      //返回数据给前端
      res.json({ code: 20000, data: "上传成功" })
    })
  } catch (error) {
    next(error)
  }

})




module.exports = router;