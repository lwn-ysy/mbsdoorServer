const express = require('express');
const path = require('path')
const router = express.Router();

// form包括图片解析库
const formidable = require('formidable')

router.post('/', (req, res, next) => {
  let form = new formidable({
    keepExtensions: true,
    uploadDir: './static/image/banner/',
    multiples: true
  });


  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
    }
    const PATH = "https://mbsdoor.com:5000/static/image/banner/";
    let picURL = PATH + files.file.path.split('\\').slice(-1)[0];
    res.json({ code: 20000, data: "上传成功" })
  })
})




module.exports = router;