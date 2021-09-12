# 门博士项目系列--后端服务器

##### 基于 nodejs + express框架 + mysql数据库  



##### 1.通过服务端设置**Access-Control-Allow-Origin**，解决跨域问题。TODO:**带cookie跨域请求**

```app.all('*', function (req, res, next) {
app.all('*', function (req, res, next) {
	// 允许的跨域访问的域名
    res.header("Access-Control-Allow-Origin", "*");
    // 允许的请求头
    res.header("Access-Control-Allow-Headers", " Origin, X-Requested-With, Content-Type, Accept,X-Token");
    res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});
```



##### 2.通过第三方库formidable,实现图片的上传功能。

formidable：处理表单数据，包括文件、图片等；

我前端这里使用了elementUI的upload组件，踩了很多坑......在

```
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
```

