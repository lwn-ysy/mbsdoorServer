# 门博士项目系列--后端服务器

##### 基于 nodejs + express框架 + mysql数据库  

其它系列：

[微信小程序](https://github.com/lwn-ysy/mbsDoor)

[后台管理系统](https://github.com/lwn-ysy/mbsdoor-frontBack)

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
  // ***①注意这里的try/catch，给自己埋了坑
  try {
    // 配置
    let form = new formidable({
      keepExtensions: true,
      uploadDir: './static/image/banner/',
      multiples: true
    });

    // 解析 ***②回调函数（异步）
    form.parse(req, async (err, fields, files) => {
      if (err) {
        next(err);
      }
      const PATH = "https://mbsdoor.com:5000/static/image/banner/";
      let picURL = PATH + files.file.path.split('\\').slice(-1)[0];
      fields.picURL = picURL;

      // 数据库处理 ***③dbAddBanner也是promise异步函数
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

##### 3.try/catch捕捉异常

现在来填下上面(2里try/catch)的坑，看上面js块。

try/catch(标注①)里面有个回调函数（标注②），异步的。假如dbAddBanner（标注③）异步promise函数报错了，try/catch并不会捕捉到报错，因为②回调函数执行的时候，线程已经脱离try/catch执行代码块。

解决办法，可以把try/catch放在②回调函数里：

ps:虽然dbUpdateShop是个promise异步函数，这里添加了await，强制把处理异步函数的线程停留在try/catch代码块中，所以报错时，还是在try/catch线程里，可以捕捉到；

**有种通俗的理解是：try/catch虽只能捕捉同步，await却可把异步转为同步**。

```
...
// 改进
form.parse(req, async (err, fields, files) => {
    try {
      if (err) {
        next(err);
      }
      ...
      await dbUpdateShop(fields)
      res.json({ code: 20000, data: "更新成功" })
    } catch (error) {
      next(error)
    }
 // 改进方法二:直接用promise.catch捕捉
 dbUpdateShop(fields).catch(err => next(err))
 
```

一句话总结try/catch：

**报错时，线程执行已经进入 try catch 代码块，但是并未执行完成，可以捕获到异常**
