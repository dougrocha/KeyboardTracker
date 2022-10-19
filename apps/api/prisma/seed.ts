import { PrismaClient } from '@prisma/client'
import * as FlakeId from 'flake-idgen'
import * as intFormat from 'biguint-format'

const prisma = new PrismaClient()

const flake = new FlakeId({
  epoch: new Date('2021-01-01').getTime(),
  datacenter: 1,
})

async function main() {
  const nextId = () => intFormat(flake.next(), 'dec')

  const userId1 = nextId()
  const userId2 = nextId()

  const productId1 = nextId()
  const productId2 = nextId()

  const vendorId1 = nextId()
  const vendorId2 = nextId()

  const formField1 = 0
  const formField2 = 1
  const formField3 = 2
  const formField4 = 3
  const formField5 = 4
  const formField6 = 5

  const formAnswer1 = 0
  const formAnswer2 = 1
  const formAnswer3 = 2
  const formAnswer4 = 3
  const formAnswer5 = 4
  const formAnswer6 = 5
  const formAnswer7 = 6
  const formAnswer8 = 7
  const formAnswer9 = 8

  const formId1 = nextId()

  const formListValueAnswer1 = 0
  const formListValueAnswer2 = 1
  const formListValueAnswer3 = 2
  const formListValueAnswer4 = 3
  const formListValueAnswer5 = 4

  await prisma.user.create({
    data: {
      id: userId1,
      email: 'doug@gmail.com',
      password: 'password',
      username: 'doug',
      name: 'Doug Rocha',
      discord: {
        create: {
          discordId: '9238475183022',
          username: 'douger',
          discriminator: '1234',
          accessToken: '38394bf98nqe9ap9v',
          refreshToken: 'adsjhasdlh2893123587',
          connected: new Date(),
          email: 'doug.discord@gmail.com',
          mfaEnabled: false,
        },
      },
    },
  })

  await prisma.user.create({
    data: {
      id: userId2,
      email: 'dave@icloud.com',
      password: 'pass123',
      username: 'dave',
      designerAccount: {
        create: {
          username: 'davedesign',
          name: 'Dave Design',
        },
      },
    },
  })

  await prisma.vendor.create({
    data: {
      id: vendorId1,
      name: 'Keycult',
      country: 'China',
      verified: true,
    },
  })

  await prisma.vendor.create({
    data: {
      id: vendorId2,
      name: 'Drop',
      country: 'USA',
      verified: true,
    },
  })

  await prisma.product.create({
    data: {
      id: productId1,
      name: 'Product 1',
      description: 'Product 1 description',
      price: 100,
      estimatedDeliveryQuarter: 'Q1',
      estimatedDeliveryYear: '2021',
      type: 'KEYBOARD',
      brand: 'GMK',
      designer: {
        connect: {
          id: userId2,
        },
      },
    },
  })

  await prisma.product.create({
    data: {
      id: productId2,
      name: 'Product 2',
      description: 'Product 2 description',
      price: 200,
      estimatedDeliveryQuarter: 'Q2',
      estimatedDeliveryYear: '2023',
      type: 'KEYCAP_SET',
      brand: 'JTK',
    },
  })

  await prisma.keycapSet.create({
    data: {
      material: 'ABS',
      profile: 'SA',
      product: {
        connect: {
          id: productId2,
        },
      },
    },
  })

  await prisma.keyboard.create({
    data: {
      product: {
        connect: {
          id: productId1,
        },
      },
    },
  })

  await prisma.productVendor.create({
    data: {
      productId: productId1,
      vendorId: vendorId1,
    },
  })

  await prisma.productVendor.create({
    data: {
      productId: productId2,
      vendorId: vendorId2,
    },
  })

  await prisma.form.create({
    data: {
      id: formId1,
      name: 'Form 1',
      description: 'Form 1 description',
      product: { connect: { id: productId1 } },
      createdBy: {
        connect: {
          id: userId2,
        },
      },
      fields: {
        createMany: {
          data: [
            {
              id: formField1,
              name: 'Text 1',
              type: 'TEXT',
              required: true,
              position: 0,
              description: 'Text 1 description',
            },
            {
              id: formField2,
              name: 'TextArea 2',
              type: 'TEXTAREA',
              required: false,
              position: 1,
              description: 'TextArea 2 description',
            },
            {
              id: formField3,
              name: 'Number 3',
              type: 'NUMBER',
              required: true,
              position: 2,
              description: 'Number 3 description',
            },
            {
              id: formField4,
              name: 'Select 4',
              type: 'SELECT',
              required: false,
              position: 3,
              description: 'Select 4 description',
            },
            {
              id: formField5,
              name: 'Radio 5',
              type: 'RADIO',
              required: true,
              position: 4,
              description: 'Radio 5 description',
            },
            {
              id: formField6,
              name: 'Boolean 6',
              type: 'BOOLEAN',
              required: false,
              position: 5,
              description: 'Boolean 6 description',
            },
          ],
        },
      },
      formAnswer: {
        createMany: {
          data: [
            {
              id: formAnswer1,
              booleanValue: true,
              userId: userId1,
              formFieldId: formField6,
            },
            {
              id: formAnswer2,
              numberValue: 123,
              userId: userId1,
              formFieldId: formField3,
            },
            {
              id: formAnswer3,
              textValue: 'Text 1 answer',
              userId: userId1,
              formFieldId: formField1,
            },
            {
              id: formAnswer4,
              textValue: 'TextArea 2 answer',
              userId: userId1,
              formFieldId: formField2,
            },
            {
              id: formAnswer5,
              userId: userId1,
              formFieldId: formField4,
            },
            {
              id: formAnswer6,
              userId: userId1,
              formFieldId: formField5,
            },
            {
              id: formAnswer7,
              userId: userId1,
              formFieldId: formField4,
            },
            {
              id: formAnswer8,
              userId: userId1,
              formFieldId: formField5,
            },
            {
              id: formAnswer9,
              userId: userId1,
              formFieldId: formField4,
            },
          ],
        },
      },
    },
  })

  const formListValue1 = 0
  const formListValue2 = 1
  const formListValue3 = 2
  const formListValue4 = 3
  const formListValue5 = 4

  await prisma.formListValues.createMany({
    data: [
      {
        id: formListValue1,
        value: 'Select 4 answer 1',
        position: 0,
        formFieldId: formField4,
      },
      {
        id: formListValue2,
        value: 'Select 4 answer 2',
        position: 1,
        formFieldId: formField4,
      },
      {
        id: formListValue3,
        value: 'Select 4 answer 3',
        position: 2,
        formFieldId: formField4,
      },
      {
        id: formListValue4,
        value: 'Radio 5 answer 1',
        position: 0,
        formFieldId: formField5,
      },
      {
        id: formListValue5,
        value: 'Radio 5 answer 2',
        position: 1,
        formFieldId: formField5,
      },
    ],
  })

  await prisma.formListValueAnswers.createMany({
    data: [
      {
        formAnswerId: formAnswer5,
        optionId: formListValue1,
        formId: formId1,
        formFieldId: formField4,
      },
      {
        formAnswerId: formAnswer7,
        optionId: formListValue2,
        formId: formId1,
        formFieldId: formField4,
      },
      {
        formAnswerId: formAnswer9,
        optionId: formListValue3,
        formId: formId1,
        formFieldId: formField4,
      },
      {
        formAnswerId: formAnswer6,
        optionId: formListValue4,
        formId: formId1,
        formFieldId: formField5,
      },
      {
        formAnswerId: formAnswer8,
        optionId: formListValue5,
        formId: formId1,
        formFieldId: formField5,
      },
    ],
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
