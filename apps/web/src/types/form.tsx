import { Product } from "./product"
import { User } from "./user"

export interface Form {
  id: string

  name: string
  description?: string

  fields: FormField[]
  responses?: FormResponse[]

  startDate?: Date
  endDate?: Date

  product?: Product
  productId?: string

  createdBy?: User
  createdById?: string

  createdAt: Date
  updatedAt: Date
}

export const FieldType = {
  TEXT: "TEXT",
  TEXTAREA: "TEXTAREA",
  BOOLEAN: "BOOLEAN",
  SELECT: "SELECT",
  RADIO: "RADIO",
  NUMBER: "NUMBER",
} as const

export type FieldType = typeof FieldType[keyof typeof FieldType]

export interface FormField {
  id: string
  name: string
  description?: string
  required: boolean
  position: number

  type: FieldType
  responses?: FormResponse[]
  values?: FieldValue[]

  form?: Form
  formId?: string

  createdAt: Date
  updatedAt: Date
}

export interface FormResponse {
  id: string
  booleanValue?: boolean
  numberValue?: number
  textValue?: string

  fieldValueResponses?: FieldValueResponse[]

  field?: FormField
  fieldId?: string

  form?: Form
  formId?: string

  user?: User
  userId?: string

  answeredAt: Date
}

export interface FieldValue {
  id: string
  position: number
  value: string

  fieldValueResponses?: FieldValueResponse[]

  parentField?: FormField
  parentFieldId?: string

  createdAt: Date
  updatedAt: Date
}

export interface FieldValueResponse {
  id: string

  value?: FieldValue
  valueId?: string

  response?: FormResponse
  responseId?: string
}
