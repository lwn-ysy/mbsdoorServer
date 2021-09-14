const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
// form包括图片解析库
const formidable = require('formidable')
const { dbGetShop, dbDeleteShop, dbUpdateShop, dbAddShop } = require('../controller/frontback_shop');

// 获取
router.get('/page', async (req, res, next) => {
  try {
    let result = await dbGetShop();
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
    uploadDir: './static/image/coverimage/',
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
      const PATH = "https://mbsdoor.com:5000/static/image/coverimage/";
      fields.coverPicUrl = PATH + files.file.path.split('\\').slice(-1)[0];
      // 前端传来的tagID本来是数组，到这里变成字符串了
      fields.tagID = fields.tagID.split(',').map(i => parseInt(i))
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
  try {
    let form = new formidable({
      keepExtensions: true,
      uploadDir: './static/image/coverimage/',
      multiples: true
    });
    form.parse(req, async (err, fields, files) => {// files.file字段是由前端传送过来的
      if (err) {
        next(err);
      }
      if (!files.file) {
        next(new Error("图片上传失败，图片数据字段应是file"));
      }
      const PATH = "https://mbsdoor.com:5000/static/image/coverimage/";
      fields.coverPicUrl = PATH + files.file.path.split('\\').slice(-1)[0];
      fields.tagID = fields.tagID.split(',').map(i => parseInt(i))
      await dbAddShop(fields).catch(errPromise => next(errPromise))
      res.json({ code: 20000, data: "增加成功" })
    })
  } catch (error) {
    next(error)
  }

})



module.exports = router;