import type {
  WaterFlowType,
  WaterfallFlowOptions,
  ColumnHeightType,
  ElementType
} from "../types/waterfall-flow"


class WaterFlow implements WaterFlowType {

  options: WaterfallFlowOptions = {
    bottomHeight: 0,
    element: null,
    itemWidth: 0,
    refreshCallback: () => { }
  }

  columnWidth = 0
  column_num = 1
  gap = 0

  elements: Array<ElementType> = [] //  元素列表
  columns: Array<Array<HTMLElement>> = []  //  列
  columns_heights: ColumnHeightType = {}  //  列高

  fistView = true

  bottomHeight = 0  //  触底高度
  isBottom = false  //  是否触底
  refreshCallback: Function = () => { }  //  触底的回调函数

  constructor(options: WaterfallFlowOptions) {
    this.options = options
    // 初始化
    this.init(options)
    // 开始排列
    this.arrangeColumn(this.elements).then(() => {
      // 监听尺寸变化---为什么要在这，元素本身会影响到盒子的大小（暂未知原因，可能是滚动条），故这样设计，且将第一次监听无效化。
      this.resizeObserver(options.element!)
    })

    // 监听触底事件
    this.scrollToBottom(options.element!)

    //  监听盒子中节点变化
    this.mutationObserver(options.element!)

  }
  /** 初始化 */
  init(options: WaterfallFlowOptions) {
    //  计算列
    const columnObj = this.calculateColumn(options.element!, options.itemWidth)
    this.columnWidth = options.itemWidth
    this.column_num = columnObj.column
    this.gap = columnObj.gap
    this.bottomHeight = options.bottomHeight
    this.refreshCallback = options.refreshCallback
    // 将columns_heights设为空
    this.columns_heights = {}

    for (let i = 0; i < columnObj.column; i++) {
      this.columns.push([])
      this.columns_heights[i] = 0
    }

    // 提取列表
    this.elements = this.filterElements(options.element!)
  }
  /** 监听尺寸变化 */
  resizeObserver(element: HTMLElement) {
    const that = this
    const debouncedHandle = this.debounce(this.resizeResetElement, 500)
    const resizeObserverCtx = new ResizeObserver(_ => {
      this.fistView ? '' : debouncedHandle(that)
      this.fistView = false
    });
    resizeObserverCtx.observe(element);
  }
  /** 监听滚动触底事件 */
  scrollToBottom(element: HTMLElement) {
    // 监听 scroll 事件
    element.addEventListener('scroll', () => {
      // 获取 div 的滚动高度
      const scrollTop = element.scrollTop;

      // 获取 div 的可视高度
      const clientHeight = element.clientHeight;

      // 获取 div 的总高度
      const scrollHeight = element.scrollHeight;

      // 判断是否触底
      if (scrollTop + clientHeight >= (scrollHeight - this.bottomHeight)) {
        if (this.isBottom) {
          // 说明已经触底了
        } else {
          this.isBottom = true
          this.refreshCallback()
        }
      } else {
        this.isBottom = false
      }
    });
  }
  /** 监听盒子中节点变化 */
  mutationObserver(element: HTMLElement) {
    let that = this
    // 创建一个观察者对象
    const observer = new MutationObserver(function (mutationsList, _) {
      // 将变化的元素进行提取
      const mutations = mutationsList.filter(mutation => mutation.type === 'childList');

      // 提取变化的元素
      const addedNodes = mutations.flatMap(mutation => Array.from(mutation.addedNodes));

      // 提取变化的元素
      // const removedNodes = mutations.flatMap(mutation => Array.from(mutation.removedNodes));

      // 新增元素
      that.addElements(addedNodes as HTMLElement[])
      // 删除元素
      // that.removeElements(removedNodes)
    });

    // 使用配置文件调用observe方法
    const config = { attributes: false, childList: true, subtree: false };

    // 传入目标节点和观察选项开始观察
    observer.observe(element, config);
  }
  /** 函数防抖 */
  debounce(fn: Function, delay: number): Function {
    let timeout: any = null;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        // @ts-ignore
        fn.apply(this, arguments);
      }, delay);
    };
  }
  /** 尺寸改变重写绘制页面 */
  resizeResetElement(that: WaterFlow) {
    that.init(that.options)
    that.arrangeColumn(that.elements)
  }
  /** 计算列 */
  calculateColumn(element: HTMLElement, itemWidth: number) {
    const maxWidth = element.clientWidth
    const column = Math.floor(maxWidth / itemWidth)
    const gap = Math.floor((maxWidth % itemWidth) / (column + 1))
    return {
      column,
      gap
    }
  }
  /** 构建元素排列 */
  filterElements(element: HTMLElement) {
    // 需要过滤一下
    let items = []
    for (let i = 0; i < element.childNodes.length; i++) {
      const item = element.childNodes[i];
      const result = this.extractElement(item as HTMLElement)
      if (result) {
        items.push(result)
      }
    }
    return items
  }
  extractElement(element: HTMLElement) {
    let result: ElementType = {
      element: null,
      loadImage: false,
      imageElement: null,
    }
    if (element.dataset) {
      if ("item" in element.dataset) {
        result.element = element
        const imgResult = this.findImage(element.childNodes)
        result.loadImage = imgResult.hasImage
        result.imageElement = imgResult.imageElement
        return result
      }
    }
  }
  /** 递归查找是否有data-image属性的节点 */
  findImage(childNodes: NodeListOf<ChildNode>) {
    let imgResult: {
      hasImage: boolean,
      imageElement: HTMLElement | null,
    } = {
      hasImage: false,
      imageElement: null,
    }
    for (let i = 0; i < childNodes.length; i++) {
      const item = childNodes[i] as HTMLElement;
      if (item.dataset) {
        if ("image" in item.dataset) {
          imgResult.hasImage = true
          imgResult.imageElement = item
          break
        }
      } else {
        imgResult = this.findImage(item.childNodes)
      }
    }
    return imgResult
  }
  /** 加载图片-同步 */
  loadImage(element: HTMLImageElement) {
    return new Promise((resolve, reject) => {
      // 判断图片是否在本地缓存了，如果有，则时加载成功的，没有则在onload中进行监听
      var isLoaded = element.complete && element.naturalHeight !== 0;
      if (isLoaded) {
        resolve(true)
      } else {
        element.onload = (_) => {
          resolve(true)
        }
        element.onerror = (_) => {
          reject(false)
        }
      }
    })
  }
  /** 排列 */
  async arrangeColumn(elements: ElementType[]) {
    for (let i = 0; i < elements.length; i++) {
      const item = elements[i];
      // 判断是否需要加载图片
      if (item.loadImage) {
        await this.loadImage(item.imageElement as HTMLImageElement).catch(() => {
          item.imageElement!.style.height = "300px"
        })
      }
      // 挨个布局
      this.arrangeItem(item.element!)
    }
  }
  /** 进行布局 */
  arrangeItem(element: HTMLElement) {
    // 因为都要添加进入列表，所以直接循环列，判断是否符合条件

    let heights = Object.values(this.columns_heights)

    const minHeight = Math.min(...heights);
    const index = heights.indexOf(minHeight);

    element.style.top = minHeight + "px"

    if (index > 0) {
      element.style.left = (index * this.columnWidth) + (this.gap * (index + 1)) + "px"
    } else {
      element.style.left = (this.gap) + "px"
    }

    element.style.display = "block"

    this.columns[index].push(element)
    this.columns_heights[index] += element.clientHeight + this.gap
  }
  /** 新增元素 */
  addElements(elements: HTMLElement[]) {
    if (!elements || elements.length <= 0) {
      return 0;
    }
    let list: ElementType[] = []
    elements.forEach((el) => {
      const result = this.extractElement(el)
      if (result && result.element) {
        list.push(result)
        this.elements.push(result)
      }
    })
    this.arrangeColumn(list)
  }
}

export default WaterFlow
