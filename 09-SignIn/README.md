# Sign In

## 运行方式

0.确保您的电脑已经安装node.js，express，mongodb等相关组件。

0.为方便上传，已将较大文件打包，请将目录中的node_modules.zip解压到同目录下。

1.打开终端/命令行。

2.cd进入作业文件夹目录/SignIn

​	cd yourOwnDir/SignIn

3.启动Mongodb数据库应用

​	mongod --dbpath ./data

4.新建一终端/命令行窗口，在同目录下启动Express DEBUG工具对Express框架下项目进行调试检查

​	DEBUG=signin:* npm start

4.收到服务器启动信息后，打开浏览器（推荐使用Chrome，与项目调试平台一致，同时请将分辨率和缩放比例调整为默认100%，以期达到目的显示效果），地址栏中输入

​	localhost:8000/register 即可开始运行
