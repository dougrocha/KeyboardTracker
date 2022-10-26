import { GroupBuyStatus } from "../types/groupBuyStatus"

export const StatusString = (status: GroupBuyStatus) => {
  switch (status) {
    case GroupBuyStatus.DELAYED:
      return "Delayed"
    case GroupBuyStatus.DELIVERED:
      return "Delivered"
    case GroupBuyStatus.GROUP_BUY:
      return "Group Buy"
    case GroupBuyStatus.INTEREST_CHECK:
      return "Interest Check"
    case GroupBuyStatus.WAITING_GROUP_BUY:
      return "Waiting Group Buy"
    case GroupBuyStatus.GROUP_BUY_ENDED:
      return "Group Buy Ended"
    case GroupBuyStatus.WAITING_GROUP_BUY:
      return "Waiting Group Buy"
    case GroupBuyStatus.PRODUCTION:
      return "Production"
    case GroupBuyStatus.SHIPPING:
      return "Shipping"
    default:
      return "Unknown"
  }
}
