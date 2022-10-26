export const GroupBuyStatus = {
  UPCOMING: "UPCOMING",
  INTEREST_CHECK: "INTEREST_CHECK",
  WAITING_GROUP_BUY: "WAITING_GROUP_BUY",
  DELAYED: "DELAYED",
  GROUP_BUY: "GROUP_BUY",
  GROUP_BUY_ENDED: "GROUP_BUY_ENDED",
  PRODUCTION: "PRODUCTION",
  SHIPPING: "SHIPPING",
  DELIVERED: "DELIVERED",
} as const

export type GroupBuyStatus = typeof GroupBuyStatus[keyof typeof GroupBuyStatus]
