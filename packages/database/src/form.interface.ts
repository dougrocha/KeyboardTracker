import { ExtractTypeFromArray } from "@meka/types"
import { Prisma } from "@prisma/client"

const formWithFields = Prisma.validator<Prisma.FormArgs>()({
  include: {
    fields: true,
  },
})

export type FormWithFields = Prisma.FormGetPayload<typeof formWithFields>

const formWithFieldsAndValues = Prisma.validator<Prisma.FormArgs>()({
  include: {
    fields: {
      include: {
        values: true,
      },
    },
  },
})

export type FormWithFieldsAndValues = Prisma.FormGetPayload<
  typeof formWithFieldsAndValues
>

export type FormFieldsWithValues = ExtractTypeFromArray<
  FormWithFieldsAndValues["fields"]
>
