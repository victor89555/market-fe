/**
 *  分页模型
 * @description :: 定义分页模型
 */

export class Page<T> {
  pageNo: number = 1
  pageSize: number = 15
  totalCount: number = -1
  totalPages: number = 0
  hasNextPage: boolean = false
  hasPrePage: boolean = false
  beginIndex: number = 0
  endIndex: number = 0
  items: T[]
  loading: boolean = false


  constructor() {
  }

  reset() {
    this.pageNo = 1
    this.totalCount = -1
    this.totalPages = 0
    this.hasNextPage = false
    this.hasPrePage = false
    this.loading = false
  }

  startLoad() {
    this.loading = true
  }

  endLoad() {
    this.loading = false
  }

  /**
   * 将自身数据传入observer 供监听者处理
   */
  notify() {
    // debugger
    // this.observer.next(this)
  }
}


