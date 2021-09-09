# 门博士项目系列--后端服务器

基于 nodejs + express框架 + mysql数据库  



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



