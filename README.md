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

+ computedNextPage --------- 表格中删除一定数据后，计算下次请求的页码数
+ delay -------------------- 延迟执行函数，休眠函数
+ downloadFileByFetch ------ 通过 fetch 请求下载文件
+ downloadFiles ------------ 文件下载
+ includeScripts ----------- 加载外部 `js` `css` 文件，支持串行加载多个文件
+ isEmptyArray ------------- 判断数组是否为空；每一项之和是否为 0；每一项的某键的值之和是否为 0
+ isInSameNetworkSegment --- 判断两个 ip 是否在同一网段
+ isNumber ----------------- 是否为数字数据类型
+ isObject ----------------- 是否为对象。格式为 `{}` | `() => {}` | `function () {}`
+ patterns ----------------- 常用正则表达式：`email`, `phone`, `ip`, `port`, `url` 等
+ playAudio ---------------- 播放音频
+ typeOf ------------------- 验证数据类型
+ uniqueArray -------------- 数组去重
+ validatePassword --------- 密码校验, 可以校验大写字母, 小写字母, 数字, 特殊字符或其中的特定几项, 也可以校验长度
+ flattenArray ------------- 数组扁平化
+ numFormatW --------------- number格式化W
+ secondFormatDays --------- 秒格式化天、时、分
+ getQueryName ------------- 获取URL的name
+ arraySort ---------------- 数组排序
+ expireTime --------------- license到期时间
+ qs ----------------------- 模拟 qs 插件写的方法, 提供 `stringifyQuery`, `parseQuery` 方法


## 兼容性

> IE >= 10
