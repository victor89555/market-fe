export class ElectronicScale {
  id: number
  lastUpdateUser: string
  sequenceNo: string
  softVersion: string
  marketId: number
  shopId: number
  status: number
}

export class ElectronicScaleHistory {
  id: number
  shopId: number
  shopName: string
  scaleStatus: number
  allocateTime: string
  unbindTime: string
}
