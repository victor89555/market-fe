export class Contract {
  id: number
  marketId: number
  shopId: number
  signTime: string
  validityTime: string
  totalAmount: number
  paidAmount: number
  status: number
  attachmentIds: number[] = []
}

export class Attachment {

}
