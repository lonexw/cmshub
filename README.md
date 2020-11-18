# 安装依赖
yarn

# 本地调试
yarn serve

# 编译
yarn build

# 格式化代码
npm run lint

# 编译并发布到测试服, gh-pages 分支
npm run deploy

# 编译并发布 gh-pages-prod 分支
npm run deploy:prod


# env配置
## 本地（测试）环境
```
NODE_ENV = development
BASE_URL = "/"
VUE_APP_PUBLIC_PATH = "/"
VUE_APP_API = ""
```
## 生产环境需配置oss账号信息，生成后的dist文件夹会上传到oss上
```
NODE_ENV = "production"
BASE_URL = "./"
VUE_APP_PUBLIC_PATH = "https://cmshub-server.oss-cn-beijing.aliyuncs.com/assets/dist"
VUE_APP_API = ""

ACCESS_KEY_ID = ""
ACCESS_KEY_SECRET = ""
REGION = "oss-cn-beijing"
BUCKET = "cmshub-server"
PREFIX = "assets/dist"
```

# 需注意的几点
## 创建关联模型字段
1 创建关联模型字段后不能修改，只能删除后重新添加
2 创建关联模型字段的模型，必须要有 title 字段，内容列表和选择关联模型时会用到