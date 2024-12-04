
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

/** 获取列表中的随机值 */
export function randomList<T>(list: Array<T>): T

/**
 * 合并两个对象
 * @param {Object} obj1 - 第一个对象
 * @param {Object} obj2 - 第二个对象
 * @param {String} type - 决定重复属性时的取值对象，可选值：'default'、'left'、'right'
 * @param {Boolean} recursion - 是否递归合并嵌套对象
 * @returns {Object} - 合并后的对象
 */
export function mergeObjects(obj1: { [key: string]: any }, obj2: { [key: string]: any, }, type: 'default' | 'left' | 'right', recursion: boolean): Object

/**
 * 复制内容到剪贴板
 * @param {String} text - 要复制的内容
 */
export function copyToClipboard(text: string): void





/** 将element元素全屏 */
export function enterFull(element: HTMLElement): void

/** 退出全屏 */
export function exitFull(): void

/** 当前处于全屏的元素 */
export function checkFullScreen(): Element | null

/** 判断是否全屏 */
export function isFullScreen(): boolean

/** 全屏切换 */
export function toggle(element: Element): void

