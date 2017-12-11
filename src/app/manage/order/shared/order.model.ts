export class Order {
  id: number
  marketId: number
  memberId: number
  origAmount: number
  outTradeNo: string
  payWay: number
  scaleId: number
  shopId: number
  source: number
  status: number
  totalAmount: number
  tradingTime: string
  transLogNo: string
}

export class OrderLine {
  id: number
  order: number
  productId: number
  unitName: string
  price: number
  qty: number
  discount: number
  origAmount: number
  totalAmount: number
}
