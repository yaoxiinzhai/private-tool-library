### private-tool-library


杨夕专属工具箱，欢迎使用嗷；部分小功能实现方法，且有而外扩展，具体方法列表见下文。


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



##### 后续还有很多好玩的小案例嗷，别放弃，坚持更新，加油吖！
