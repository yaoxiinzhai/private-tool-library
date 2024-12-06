

/** 构建参数 */
export interface WaterfallFlowOptions {
  /** 容器 */
  element: HTMLElement | null
  /** 子元素宽度 */
  itemWidth: number
  /** 触底高度 */
  bottomHeight: number
  /** 触底后的回调函数 */
  refreshCallback: Function
}

/** 列类型 */
export interface ColumnType {

}

/** 列高度类型 */
export interface ColumnHeightType {
  [key: number]: number
}

/** 处理后的元素类型 */
export interface ElementType {
  element: HTMLElement | null
  loadImage: boolean
  imageElement: HTMLElement | null;
}



/** 瀑布流类 */
export interface WaterFlowType {
  options: WaterfallFlowOptions
  /** 列高度 */
  columns_heights: ColumnHeightType
  /** 列 */
  columns: Array<Array<HTMLElement>>
  /** 列数 */
  column_num: number
  /** 间距 */
  gap: number
  /** 底部高度 */
  bottomHeight: number
  /** 刷新回调函数 */
  refreshCallback: Function

  init: Function
  resizeObserver: Function
  scrollToBottom: Function
  mutationObserver: Function
  debounce: Function
  resizeResetElement: Function
  calculateColumn: Function
  filterElements: Function
  extractElement: Function
  findImage: Function
  loadImage: Function
  arrangeColumn: Function
  arrangeItem: Function
  addElements: Function
}