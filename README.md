### private-tool-library


杨夕专属工具箱，欢迎使用嗷；部分小功能实现方法，且有额外的扩展，具体方法列表见下文。


|                                                   方法及参数 | 方法介绍                     |
| -----------------------------------------------------------: | ---------------------------- |
| emptyParameterClear(*data*?: *any*, *type*?: 'default' \|'type'\|'field', rules?:null):any | 去除对象、数组中的空字段     |
|      dateFormat(*format*: *string*, *date*?: *Date*): string | 时间格式化                   |
|                               deepCopy<*T*>(*obj*: *T*): *T* | 深度拷贝                     |
|                                                    getUUID() | 生成uuid                     |
| handleTree(*data*: *any*[], *id*: *string*, *parentId*?: *string*, *children*?: *string*):any[] | 构造树型结构数据             |
| iterationQuery(*data*: *Array*<*any*>, *id*: *any*, *idKey*: *string* = "id", *children*: *string* = 'children'):any[] | 检索深度                     |
| lookNodeData(*data*: *Array*<*any*>, *id*: *any*, *idKey*: *string* = "id", *children*: *string* = 'children') | 查找节点数据                 |
| objectGenerateString(*obj*: *any*, *connectStr* = "=", *intervalKey* = "&") | 将对象变为url字符串-仅限一层 |
|                             untieUrl(*url*: *string*): *any* | 解构url                      |
|                   randomList<*T*>(*list*: *Array*<*T*>): *T* | 获取列表中的随机值           |
|                     mergeObjects(obj1,obj2,type,*recursion*) | 合并两个对象                 |
|                    copyToClipboard(*text*: *string*): *void* | 复制内容到剪贴板             |
|                  enterFull(*element*: *HTMLElement*): *void* | 将element元素全屏            |
|                                           exitFull(): *void* | 退出全屏                     |
|                          checkFullScreen(): *Element* \|null | 当前处于全屏的元素           |
|                                    isFullScreen(): *boolean* | 判断是否全屏                 |
|                         toggle(*element*: *Element*): *void* | 全屏切换                     |



##### 后续还有很多好玩的小案例嗷，别放弃，坚持更新，加油吖！





```cpp
// 官方镜像源
npm config set registry https://registry.npmjs.org/
// 淘宝镜像源
npm config set registry https://registry.npmmirror.com/
//  发布
npm publish
```
