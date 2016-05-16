# react-canvas-anime
这个项目是自己做着玩的，用来使用Canvas绘制一幅图，使用React组件化的尝试。

## 开发

1. 安装依赖
```shell
$ cd path/to/repo
$ npm install -g typescript typings webpack
$ npm install
```

2. 运行
```shell
$ npm run dev
```

3. 浏览`http://localhost:8080`

## 部署

1. 打包
```shell
$ npm run deploy
```

2. 在`/dist`中找到静态文件

## 编译为es5

1. 编译
```shell
$ tsc
```
2. 在`/tsdist`中获得es5脚本

## 性能优化

1. 使用离屏Canvas
2. 位置信息取整：
  1. `Math.floor(a[i])`, array[100000], 1000 times, 230ms
  2. `(0.5 + A[i]) | 0`, array[100000], 1000 times, 160ms
  3. `~~(0.5 + A[i])`, array[100000], 1000 times, 160ms
  4. `(0.5 + A[i]) << 0`, 1000 times, 155ms