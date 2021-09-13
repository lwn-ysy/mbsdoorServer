const express = require('express');
const router = express.Router();
// form包括图片解析库
const formidable = require('formidable')
const { dbGetBanner, dbDeleteBanner, dbUpdateBanner, dbAddBanner } = require('../controller/frontback_banner');

// 获取
router.get('/banner', async (req, res, next) => {
  try {
    let result = await dbGetBanner();
    res.json({ code: 20000, data: result })
  } catch (error) {
    next(error);
  }
})
// 删除
router.delete('/banner', async (req, res, next) => {
  let { bannerID } = req.query;
  try {
    await dbDeleteBanner(bannerID);
    res.json({ code: 20000, data: '删除成功' })

  } catch (error) {
    next(error);
  }
})


// 更新
router.put('/banner', async (req, res, next) => {
  let data = req.body;
  try {
    await dbUpdateBanner(data);
    res.json({ code: 20000, data: '更新成功' })

  } catch (error) {
    next(error);
  }
})

// 增加
router.post('/banner', (req, res, next) => {
  try {
    let form = new formidable({
      keepExtensions: true,
      uploadDir: './static/image/banner/',
      multiples: true
    });
    form.parse(req, async (err, fields, files) => {
      if (err) {
        next(err);
      }
      const PATH = "https://mbsdoor.com:5000/static/image/banner/";
      let picURL = PATH + files.file.path.split('\\').slice(-1)[0];
      fields.picURL = picURL;
      await dbAddBanner(fields).catch(errPromise => next(errPromise))
      res.json({ code: 20000, data: "上传成功" })
    })
  } catch (error) {
    next(error)
  }

})



module.exports = router;