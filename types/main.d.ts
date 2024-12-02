
/** 去除对象、数组中的空字段 */
export function emptyParameterClear(data?: any, type?: 'default' | 'type' | 'field', rules?: null): any

/** 时间格式化 */
export function dateFormat(format: string, date?: Date): string

/** 深度拷贝 */
export function deepCopy<T>(obj: T): T

/** 生成uuid */
export function getUUID(): string

/** 构造树型结构数据 */
export function handleTree(data: any[], id: string, parentId?: string, children?: string): any[]

/** 检索深度 */
export function iterationQuery(data: Array<any>, id: any, idKey: string, children: string): any[]

/** 查找节点数据 */
export function lookNodeData<T>(data: Array<T>, id: any, idKey: string, children: string): T

/** 将对象变为url字符串-仅限一层 */
export function objectGenerateString(obj: any, connectStr: string, intervalKey: string): string

/** 解构url */
export function untieUrl(url: string): any