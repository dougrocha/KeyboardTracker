const ProductType = {
  KEYBOARD: "KEYBOARD",
  KEYCAP_SET: "KEYCAP_SET",
  SWITCH: "SWITCH",
} as const

export type ProductType = typeof ProductType[keyof typeof ProductType]
