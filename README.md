# utils

MoresecFE 团队的 utils 工具集。


## 安装与使用

```shell
// 安装
yarn add @moresec/utils

// 使用
import { downloadFiles, ... } from '@moresec/utils'
```


## 工具集列表

+ delay ----------- 延迟执行函数，休眠函数
+ downloadFiles --- 文件下载
+ includeScripts -- 加载外部 `js` `css` 文件，支持串行加载多个文件
+ isEmptyArray ---- 判断数组是否为空；每一项之和是否为 0；每一项的某键的值之和是否为 0
+ isObject -------- 是否为对象。格式为 `{}` | `() => {}` | `function () {}`
+ patterns -------- 常用正则表达式：`email`, `phone`, `ip`, `port`, `url` 等
+ playAudio ------- 播放音频
+ typeOf ---------- 验证数据类型
+ uniqueArray ----- 数组去重


## 兼容性

> IE >= 10
