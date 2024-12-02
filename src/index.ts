/**
 * 去除对象、数组中的空字段
 * @param {any} data -需要去空的数据
 * @param {String} type -选择过滤的方式
 * @param {Array} rules -过滤时保留规则，只在type为type、field时生效
 * @returns any
 */
export function emptyParameterClear(data?: any, type?: 'default' | 'type' | 'field', rules?: null): any {
  /**
   * 做参数处理
   * 1、默认全部去除
   * 2、保留指定类型
   * 3、保留指定字段
   */
  // 对传递的参数做处理
  init(arguments)
  // 对数据过滤
  if (type === 'default') {
    return defFilter(data)
  } else if (type === 'type') {
    return typeFilter(data, rules)
  } else if (type === 'field') {
    return fieldFilter(data, rules)
  } else {
    return data
  }

  function init(list: any) {
    if (list.length > 1) {
      data = list[0]
      type = list[1]
      if (list.length >= 3) {
        rules = list[2]
      }
    } else {
      // 有且只有一个参数时
      if (list[0].data && list[0].type && list[0].rules) {
        // 当里面都有所需参数时
        data = list[0].data
        type = list[0].type
        rules = list[0].rules
      } else {
        // 说明为默认模式
        data = list[0]
      }
    }
  }
  // 类型过滤
  function typeFilter(data: any, rules: any) {
    if (!rules.includes(readType(data))) {
      if (readType(data) === 'Object') {
        for (const key in data) {
          if (!rules.includes(readType(data[key]))) {
            // 需要过滤
            if (readType(data[key]) === 'Array' || readType(data[key]) === 'Object') {
              data[key] = typeFilter(data[key], rules)
            } else if (readType(data[key]) === 'String' || readType(data[key]) === 'Number') {
              if (data[key].length <= 0) {
                delete data[key]
              }
            } else if (readType(data[key]) === 'Null' || readType(data[key]) === 'Undefined') {
              delete data[key]
            }
          }
        }
      } else if (readType(data) === 'Array') {
        data.forEach((item: any, index: number) => {
          if (!rules.includes(readType(item))) {
            if (readType(item) === 'String' || readType(item) === 'Number') {
              if (item.length <= 0) {
                data.splice(index, 1)
              }
            } else if (readType(item) === 'Array' || readType(item) === 'Object') {
              data[index] = typeFilter(item, rules)
            } else if (readType(item) === 'Null' || readType(item) === 'Undefined') {
              data.splice(index, 1)
            }
          }
        })
      }
    }
    return data
  }
  // 指定字段过滤
  function fieldFilter(data: any, rules: any) {
    if (readType(data) === 'Object') {
      for (const key in data) {
        if (!rules.includes(key)) {
          // 需要过滤
          if (readType(data[key]) === 'String' || readType(data[key]) === 'Number') {
            if (data[key].length <= 0) {
              delete data[key]
            }
          } else if (readType(data[key]) === 'Null' || readType(data[key]) === 'Undefined') {
            delete data[key]
          } else if (readType(data[key]) === 'Array' || readType(data[key]) === 'Object') {
            data[key] = fieldFilter(data[key], rules)
          }
        }
      }
    } else if (readType(data) === 'Array') {
      data.forEach((item: any, index: number) => {
        if (readType(item) === 'Array' || readType(item) === 'Object') {
          data[index] = fieldFilter(item, rules)
        }
      })
    }
    return data
  }
  // 默认的过滤方式
  function defFilter(data: any) {
    if (readType(data) === 'Object') {
      for (const key in data) {
        // 如果是字符数字，判断长度，为0删除
        if (readType(data[key]) === 'String' || readType(data[key]) === 'Number') {
          if (data[key].length <= 0) {
            delete data[key]
          }
        } else if (readType(data[key]) === 'Null' || readType(data[key]) === 'Undefined') {
          delete data[key]
        } else if (readType(data[key]) === 'Array' || readType(data[key]) === 'Object') {
          data[key] = defFilter(data[key])
        }
      }
    } else if (readType(data) === 'Array') {
      data.forEach((item: any, index: number) => {
        if (readType(item) === 'String' || readType(item) === 'Number') {
          if (item.length <= 0) {
            data.splice(index, 1)
          }
        } else if (readType(item) === 'Array' || readType(item) === 'Object') {
          data[index] = defFilter(item)
        } else if (readType(item) === 'Null' || readType(item) === 'Undefined') {
          data.splice(index, 1)
        }
      })
    }
    return data
  }
  // 类型判断
  function readType(val: any) {
    let type = null
    switch (toString.call(val)) {
      case '[object String]':
        type = 'String'
        break
      case '[object Number]':
        type = 'Number'
        break
      case '[object Null]':
        type = 'Null'
        break
      case '[object Undefined]':
        type = 'Undefined'
        break
      case '[object Array]':
        type = 'Array'
        break
      case '[object Object]':
        type = 'Object'
        break
      default:
        break
    }
    return type
  }
}

/**
 * 时间格式化
 * @return {String}
 * @param format string
 *  */
export function dateFormat(format: string, date?: Date): string {
  var nowDate = new Date()
  if (typeof date == 'object') {
    nowDate = date
  }
  var set = [
    nowDate.getFullYear(),
    supplement(nowDate.getMonth() + 1, 10, '0'),
    supplement(nowDate.getDate(), 10, '0'),
    supplement(nowDate.getHours(), 10, '0'),
    supplement(nowDate.getMinutes(), 10, '0'),
    supplement(nowDate.getSeconds(), 10, '0')
  ]
  var backDate = ''
  if (format && format != '') {
    var SymbolList: Array<any> = format.match(/\W+/g) || []
    if (SymbolList.length > 3) {
      SymbolList.push(' ')
    }
    for (let i = 0; i < SymbolList.length; i++) {
      backDate = backDate + set[i] + SymbolList[i]
      if (i == SymbolList.length - 1) {
        backDate = backDate + set[i + 1]
      }
    }
  } else {
    backDate = set[0] + "-" + set[1] + "-" + set[2] + " " + set[3] + ":" + set[4] + ":" + set[5]
  }

  function supplement(value: number, number: number, chart = '0') {
    if (value < number) {
      return chart + value
    } else {
      return value
    }
  }
  return backDate.trim()
}

/**
 * 深度拷贝
 * @param {T} obj
 */
export function deepCopy<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any;
  }

  if (obj instanceof Array) {
    return obj.slice() as any;
  }

  const clone: { [key: string]: any } = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepCopy(obj[key]);
    }
  }

  return clone as T;
}

/**
 * 生成uuid
 * @returns String
 */
export function getUUID() {

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {

    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);

    return v.toString(16);

  });
}
/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data: any[], id: string, parentId?: string, children?: string) {
  let config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children'
  };

  var childrenListMap: { [key: string]: any } = {};
  var nodeIds: { [key: string]: any } = {};
  var tree = [];

  for (let d of data) {
    let parentId = d[config.parentId];
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  for (let d of data) {
    let parentId = d[config.parentId];
    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }

  for (let t of tree) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o: any) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  return tree;
}

/**
 * 检索深度
 * @param data 树
 * @param id id
 * @param idKey key 
 * @param children 子列表
 * @returns []
 */
export function iterationQuery(data: Array<any>, id: any, idKey: string = "id", children: string = 'children') {
  var list: Array<any> = []
  for (let i = 0; i < data.length; i++) {
    // 先判断id是否在这一层级
    if (data[i][idKey] == id) {
      list.push(data[i][idKey])
      break
    } else {
      if (data[i][children] && data[i][children].length > 0) {
        // 有数据，深层查询
        let breakList = iterationQuery(data[i][children], id, idKey, children)
        if (breakList.length > 0) {
          for (let j = 0; j < breakList.length; j++) {
            if (!list.includes(breakList[j])) {
              list.push(breakList[j])
            }
          }
          // 循环完成后，对本记录本次父id
          list.unshift(data[i][idKey])
          break
        }
      }
    }
  }
  return list
}

/**
 * 查找节点数据
 * @param data 树
 * @param id id
 * @param idKey key 
 * @param children  子列表
 * @returns Object
 */
export function lookNodeData(data: Array<any>, id: any, idKey: string = "id", children: string = 'children') {
  let _obj: any = {}
  for (let i = 0; i < data.length; i++) {
    if (data[i][idKey] == id) {
      _obj = data[i]
    } else {
      if (data[i][children] && data[i][children].length > 0) {
        _obj = lookNodeData(data[i][children], id, idKey, children)
      }
    }
  }
  return _obj
}

/**
 * 将对象变为url字符串-仅限一层
 * @param obj 对象
 * @param connectStr 连接符
 * @param intervalKey 间隔符
 */
export function objectGenerateString(obj: any, connectStr = "=", intervalKey = "&") {
  if (obj && typeof obj == "object") {
    let obj_keys = Object.keys(obj)
    let str = ""
    for (let i = 0; i < obj_keys.length; i++) {
      if (i + 1 >= obj_keys.length) {
        str = str + obj_keys[i] + connectStr + obj[obj_keys[i]]
      } else {
        str = str + obj_keys[i] + connectStr + obj[obj_keys[i]] + intervalKey
      }
    }
    return str
  } else {
    return obj
  }
}

/**
 * 解构url
 * @param {String} url -网址
 * @returns Object
 */
export function untieUrl(url: string): any {
  let obj: { [key: string]: any } = {}
  if (URLSearchParams) {
    let params = new URLSearchParams(new URL(url).search.slice(1))
    for (const key of params.keys()) {
      obj[key] = params.get(key)
    }
  } else {
    // 使用传统解构
    let url_list = url.split('?')
    if (url_list.length >= 2) {
      let params_list = url_list[1].split('&')
      params_list.forEach((item) => {
        let params = item.split('=')
        obj[params[0]] = params[1]
      })
    }
  }
  return obj
}