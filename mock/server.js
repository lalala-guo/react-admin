const express = require("express");
const Mock = require("mockjs")

const app = express();

// 随机类
const Random = Mock.Random;
// 随机中文标题
Random.ctitle();

// 解决跨域
// app.use() 中间件，代表接受所有请求
// 使用cors 解决跨域
app.use((req, res, next) => {
  // 设置响应头: 将来作为响应数据返回给客户端的
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "content-type, token");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next(); // 触发下一个中间件/路由
});

// 模拟请求，并返回模拟数据
// http://47.103.203.152/admin/edu/subject/:page/:limit get
// 后台路由：只能接受特定请求方式和请求地址的请求


// 获取二级列表数据
app.get("/admin/edu/subject/get/:parentId", (req, res, next) => {

  const { parentId } = req.params;
  const total = Random.integer(0, 5)
  // mock 数据
  const data = Mock.mock({
    total,// 以某个的范围取一个随机整数
    [`items|${total}`]:[
        {
            "_id|+1": 100,
            title:"@ctitle(2, 4)",
            parentId
        }
    ]
  })
  // console.log(data);
  if (total === 1) {
    // 当长度为1时，返回值是对象不是数组
    // 此时需要修改成数组~
    data.items = [data.items];
  }
  /*
  二级分类
  {
    _id: 2, // 自己分类id
    title: 'HTML', // 课程分类名称
    parentId: 1 // 父级分类Id，如果是0就是1级分类, 不是就是二级分类
  }
*/

  // 返回响应
  res.json({
    code: 20000, // 成功状态码
    success: true, // 成功
    data, // 成功的具体数据
    message: "", // 失败原因
  }); // 将数据装换json字符串返回响应
});


// 获取一级列表数据
app.get("/admin/edu/subject/:page/:limit", (req, res, next) => {
  /*
    req -> request 请求对象 客户端发送给服务器的数据
    res -> response 响应对象 服务器要返回给客户端的数据
  */
  // 获取请求参数  params
  const { page, limit } = req.params;

//    数据结构 
  /*
    一级分类
    {
      _id: 1, // 自己分类id
      title: '前端', // 课程分类名称
      parentId: 0 // 父级分类Id，如果是0就是1级分类
    }
    二级分类
    {
      _id: 2, // 自己分类id
      title: 'HTML', // 课程分类名称
      parentId: 1 // 父级分类Id，如果是0就是1级分类, 不是就是二级分类
    }
  */
  // mock 数据
  const data = Mock.mock({
    total: Random.integer(+limit+1, limit * 2) ,// 以某个的范围取一个随机整数
    [`items|${limit}`]:[
        {
            "_id|+1": 1,
            title:"@ctitle(2, 4)",
            parentId: 0,
        }
    ]
  })

  // 返回响应
  res.json({
    code: 20000, // 成功状态码
    success: true, // 成功
    data, // 成功的具体数据
    message: "", // 失败原因
  }); // 将数据装换json字符串返回响应
});

app.listen(9527, "localhost", (err) => {
  if (err) {
    console.log("网络错误", err);
  }
  console.log("9527服务器启动成功");
});
