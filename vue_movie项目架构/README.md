# 豆瓣电影

## nrm （npm registry manager）

```bash
$ npm i -g nrm
$ nrm ls 列出所有可用的镜像源
$ nrm use 镜像源名字
```

## 关于在模块化环境加载的 Vue文件问题

- ESMAScript 是规范
  + JavaScript 最初由一个人写出来的
    + 编译器
    + 解析执行 JavaScript 代码
    + 语法都是由作者自己造出来的
    + 网景浏览器
    + IE JScript 绝大多数
    + 有差异
    + let const Chrome Firefox
  + ECMA 欧洲计算机标准制造协会
    + 网景把 JavaScript 这个开发标准、API、语法规范 提交给了 ECMA
    + ECMAScript
    + 吸收会员：微软、谷歌、苹果、Facebook
    + 先有实现
    + 会员提出希望加入新的 API、语法
    + 加入标准，然后各大浏览器厂商根据标准做出相应的实现
  + 规范中约定了语法、API
  + 规范由各大委员提出，例如


在 ECMAscript 6 Module 规范没有出现之前：

模块化：

- 命名空间冲突问题，作用域相互独立，互不干扰
- 按照约定的规则可以让模块与模块之前进行通信

- Node 中使用了 CommonJS 模块规范，只适用于服务器环境
  + require
  + module.exports

- 浏览器中代表是
  + requirejs 开源
  + requirejs 给自己的库指定了一套规范：AMD 
    * 就是 API
    * 保护自己，保护开发人员

- Sea.js
  + 淘宝的大牛：玉伯
  + 参照 CommonJS 模块规范做出了 浏览器端的实现
  + require
  + module.exports

不同的模块规范说白了对应的模块 API 就不一样。
开发人员去编写代码的时候就需要。

ECMAScript 2015 发布了官方的模块标准规范（API）：

再过几年，以后浏览器和node都直接写 import、export 了。

webpack


## 豆瓣 API

http://api.douban.com/v2
