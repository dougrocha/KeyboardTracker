export const YearQuarter = {
  Q1: "Q1",
  Q2: "Q2",
  Q3: "Q3",
  Q4: "Q4",
} as const

export type YearQuarter = typeof YearQuarter[keyof typeof YearQuarter]
