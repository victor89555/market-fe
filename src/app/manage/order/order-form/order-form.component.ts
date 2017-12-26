import {ChangeDetectorRef, Component, EventEmitter, OnInit} from "@angular/core";
import {Modal} from "rebirth-ng";
import {Order} from "../shared/order.model";
import {OrderService} from "../shared/order.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MarketService} from "../../market/shared/market.service";
import {MemberService} from "../../member/shared/member.service";
import {ShopService} from "../../shop/shared/shop.service";
import {Market} from "../../market/shared/market.model";
import {Member} from "../../member/shared/member.model";
import {Shop} from "../../shop/shared/shop.model";

@Component({
  selector: 'app-order-form',
  templateUrl: "./order-form.component.html",
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements Modal, OnInit {
  context: { id: number };
  dismiss: EventEmitter<Order>;
  order_id: number
  orderLines: any = []
  order: Order = new Order()
  market: Market = new Market()
  member: Member = new Member()
  shop: Shop = new Shop()

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private orderService: OrderService,
              private route: ActivatedRoute,
              private router: Router,
              private marketService: MarketService,
              private memberService: MemberService,
              private shopService: ShopService) {
  }

  ngOnInit(): void {
    console.log('ModalTestComponent init....');
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this.order_id = id;
    });
    this.loadOrder();
    this.loadOrderLine();
  }

  loadOrder() {
    this.orderService.get(this.order_id).subscribe(
      (order) => {
        this.order = order
        this.getMarket(order.marketId)
        this.getMember(order.memberId)
        this.getShop(order.shopId)
        this.changeDetectorRef.markForCheck()
      }
    )
  }

  getMarket(id) {
    this.marketService.get(id).subscribe(
      (market) => {
        this.market = market
        console.log(market)
      }
    )
  }

  getMember(id) {
    this.memberService.get(id).subscribe(
      (member) => {
        this.member = member
        console.log(member)
      }
    )
  }

  getShop(id) {
    this.shopService.get(id).subscribe(
      (shop) => {
        this.shop = shop
        console.log(shop)
      }
    )
  }

  loadOrderLine() {
    this.orderService.getLine(this.order_id).subscribe(
      (orderLines) => {
        console.log(orderLines);
        this.orderLines = orderLines
        this.changeDetectorRef.markForCheck()
      }
    )
  }
  
  goBack() {
    window.history.back()
  }
}
