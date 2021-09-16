const express = require('express');
const router = express.Router();
// form包括图片解析库
const formidable = require('formidable')
const { dbGetShop, dbDeleteShop, dbUpdateShop, dbAddShop } = require('../controller/frontback_shop');

// 获取
router.get('/page', async (req, res, next) => {
  try {
    let { shopID } = req.query;
    let result = await dbGetShop(shopID);
    res.json({ code: 20000, data: result })
  } catch (error) {
    next(error);
  }
})
// 删除
router.delete('/page', async (req, res, next) => {
  let { shopID } = req.query;
  try {
    await dbDeleteShop(shopID);
    res.json({ code: 20000, data: '删除成功' })

  } catch (error) {
    next(error);
  }
})

// 更新，但不更新封面图的特例
router.put('/noimage', async (req, res, next) => {
  try {
    let data = req.body;
    console.log('前端传送的数据：', data);
    await dbUpdateShop(data);
    res.json({ code: 20000, data: "更新成功" });
  } catch (err) {
    next(err);
  }

})


// 更新
router.put('/page', async (req, res, next) => {
  let form = new formidable({
    keepExtensions: true,
    uploadDir: './static/image/shop/',
    multiples: true
  });
  form.parse(req, async (err, fields, files) => {// files.file字段是由前端传送过来的
    try {
      if (err) {
        next(err);
      }
      if (!files.file) {
        next(new Error("图片上传失败，图片数据字段应是file"));
      }
      // const host = "http://localhost:5000/";
      const host = "https://mbsdoor.com:5000/";
      fields.coverPicUrl = host + files.file.path.replace(/\\/g, '/');
      // 前端传来的tagID本来是数组，悲formidable变成字符串了
      fields.tagID = fields.tagID.split(',').map(i => parseInt(i));
      fields.imageurl = fields.imageurl.split(',');
      await dbUpdateShop(fields)
      /* 可以换下面方法
      dbUpdateShop(fields).then(res => res.send("11")).catch(err => next(err)) */
      res.json({ code: 20000, data: "更新成功" })
    } catch (error) {
      next(error)
    }

  })
})
// 增加
router.post('/page', (req, res, next) => {
  let form = new formidable({
    keepExtensions: true,
    uploadDir: './static/image/shop/',
    multiples: true
  });
  form.parse(req, (err, fields, files) => {// files.file字段是由前端传送过来的
    try {
      if (err) {
        next(err);
      }
      if (!files.file) {
        next(new Error("图片上传失败，图片数据字段应是file"));
      }
      // const host = "http://localhost:5000/";
      const host = "https://mbsdoor.com:5000/";
      // files.file.path :static\image\shop\upload_87e40b8a1d0e13c53eff04ef9031cee0.png
      fields.coverPicUrl = host + files.file.path.replace(/\\/g, '/');
      fields.tagID = fields.tagID.split(',').map(i => parseInt(i));
      fields.imageurl = fields.imageurl.split(',');
      console.log('fields:', fields)
      dbAddShop(fields).then(() => res.json({ code: 20000, data: "增加成功" })).catch(errPromise => next(errPromise));
    } catch (error) {
      next(error)
    }

  })


})




module.exports = router;