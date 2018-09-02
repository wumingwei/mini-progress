# my-project

> 基于 mpvue 微信小程序框架的简单项目

## 前端运行构建说明

```bash
# 进入项目根目录
cd my-project

# 安装依赖
npm install

# 实时编译
npm run dev

# 打包构建
npm run build
```

## 后端运行构建说明

```bash
# 进入项目基于 koa的 后端根目录
cd my-project/server

# 安装依赖
npm install

# 启动后端服务,成功后可以通过访问 localhost:5757/demo  测试结果
npm run dev
```

> 启动后端服务前,需要保证已经完成 [本地 mysql 环境][2]以及[微信小程序腾讯云本地开发环境][1];更多详情信息访问[腾讯云官方开发平台文档说明][3]

## 项目说明

* 技术栈列表:

  * mpvue 小程序框架

  * koa: 基于 node.js 的轻量级后端服务器框架

  * async/await 数据请求

  * 基于腾讯云的小程序本地开发环境

* 项目简介

[1]: 搭建本地微信小程序阿里云开发环境:http://baidu.com
[2]: 本地安装mysql@5.7环境(mac平台):http://baidu.com
[3]: 腾讯云官方开发平台文档:http://baidu.com
