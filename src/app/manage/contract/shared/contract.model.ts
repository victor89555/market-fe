export class Contract {
  id: number
  marketId: number
  shopId: number
  signTime: string
  validityTime: string
  totalAmount: number
  scaleDeposit: number
  equipmentDeposit: number
  manageFee: number
  hireEquipments: string[]
  remark: string
  status: number
  attachmentIds: number[] = []
}

export class Attachment {

}
