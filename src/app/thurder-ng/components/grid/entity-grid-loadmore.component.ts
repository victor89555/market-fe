import {OnInit} from '@angular/core';
import {Entity} from '../../models/entity'
import {Subject} from 'rxjs/Subject'
import {Page} from "../../models/page.model"

export abstract class EntityGridLoadmoreComponent<T extends Entity> implements OnInit {

  public entityItems: T[] = []
  public page: Page<T> = new Page<T>()
  public observePage: Subject<Page<T>> = new Subject()

  ngOnInit() {
  }

  private notifyPageChange() {
    this.observePage.next(this.page)
  }

  /**
   *
   */
  loadMore() {
    this.page.startLoad()
    this.notifyPageChange()
    this.loadMoreItems().then((page: Page<T>) => {
      this.page.endLoad()
      this.notifyPageChange()
      this.observePage.next(page)
    })
  }

  /**
   * 加载更多记录
   * @returns {Promise<any>}
   */
  protected abstract loadMoreItems(): Promise<Page<T>>

}
