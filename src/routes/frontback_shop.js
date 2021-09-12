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
  console.log(shopID)
  try {
    await dbDeleteShop(shopID);
    res.json({ code: 20000, data: '删除成功' })

  } catch (error) {
    next(error);
  }
})


// 更新
router.put('/page', async (req, res, next) => {
  try {
    let form = new formidable({
      keepExtensions: true,
      uploadDir: './static/image/shop/',
      multiples: true
    });
    form.parse(req, async (err, fields, files) => {// files.file字段是由前端传送过来的
      if (err) {
        next(err);
      }
      if (!files.file) {
        next(new Error("图片上传失败，图片数据字段应是file"));
      }
      const PATH = "https://mbsdoor.com:5000/static/image/shop/";
      fields.coverPicUrl = PATH + files.file.path.split('\\').slice(-1)[0];
      await dbUpdateShop(fields)
      // TODO: msqyl语句查询错误，报错了，到这里try/catch没有捕捉到
      // 下面方法倒是可以捕捉到
      // dbUpdateShop(fields).then(res => res.send("11")).catch(err => next(err))
      res.json({ code: 20000, data: "更新成功" })
    })
  } catch (error) {
    next(error)
  }
})

// 增加
router.post('/page', (req, res, next) => {
  try {
    let form = new formidable({
      keepExtensions: true,
      uploadDir: './static/image/banner/',
      multiples: true
    });
    form.parse(req, async (err, fields, files) => {// files.file字段是由前端传送过来的
      if (err) {
        next(err);
      }
      if (!files.file) {
        next(new Error("图片上传失败，图片数据字段应是file"));
      }
      const PATH = "https://mbsdoor.com:5000/static/image/banner/";
      fields.coverPicUrl = PATH + files.file.path.split('\\').slice(-1)[0];
      await dbAddShop(fields)
      // TODO: msqyl语句查询错误，报错了，到这里try/catch没有捕捉到
      // 下面方法倒是可以捕捉到
      // dbUpdateShop(fields).then(res => res.send("11")).catch(err => next(err))
      res.json({ code: 20000, data: "增加成功" })
    })
  } catch (error) {
    next(error)
  }

})



module.exports = router;