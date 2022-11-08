import { PrismaClient } from '@prisma/client'
import * as FlakeId from 'flake-idgen'
import * as intFormat from 'biguint-format'

const prisma = new PrismaClient()

const flake = new FlakeId({
  epoch: new Date('2021-01-01').getTime(),
  datacenter: 1,
  worker: 1,
})

async function main() {
  const nextId = () => intFormat(flake.next(), 'dec')

  const user1 = await prisma.user.create({
    data: {
      id: nextId(),
      email: 'doug@gmail.com',
      password: 'password',
      username: 'doug',
      name: 'Doug Rocha',
      discord: {
        create: {
          discordId: '571520537587875851',
          username: 'slash',
          discriminator: '0001',
          accessToken: '38394bf98nqe9ap9v',
          refreshToken: 'adsjhasdlh2893123587',
          connectedAt: new Date(),
          email: 'douglas_junior@.com',
          mfaEnabled: false,
        },
      },
    },
  })

  const user2 = await prisma.user.create({
    data: {
      id: nextId(),
      email: 'billy@mail.com',
      username: 'billy',
      name: 'Billy Bob',
      password: 'password',
      designerAccount: {
        create: {
          name: 'Billy Bob Design',
          username: 'billybobdesign',
          discordServerUrl: 'https://discord.gg/1234',
          redditUsername: 'billybobdesign',
          twitterHandle: 'billybobdesign',
        },
      },
    },
  })

  const user3 = await prisma.user.create({
    data: {
      id: nextId(),
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

  const vendor1 = await prisma.vendor.create({
    data: {
      id: nextId(),
      name: 'Keycult',
      country: 'China',
      verified: true,
      url: 'https://keycult.com',
    },
  })

  const vendor2 = await prisma.vendor.create({
    data: {
      id: nextId(),
      name: 'Drop',
      country: 'USA',
      verified: true,
      url: 'https://drop.com',
    },
  })

  const product1 = await prisma.product.create({
    data: {
      id: nextId(),
      name: 'Product 1',
      description: 'Product 1 description',
      price: 100,
      estimatedDeliveryQuarter: 'Q1',
      estimatedDeliveryYear: '2021',
      groupBuyStartDate: new Date('2021-01-01'),
      groupBuyEndDate: new Date('2021-12-02'),
      layout: 'ANSI',
      status: 'INTEREST_CHECK',
      type: 'KEYBOARD',
      brand: 'GMK',
      designer: {
        connect: {
          id: user2.id,
        },
      },
    },
  })

  const product2 = await prisma.product.create({
    data: {
      id: nextId(),
      name: 'GMK Keycap Set',
      description: 'GMK Keycap Set description',
      price: 100,
      estimatedDeliveryQuarter: 'Q1',
      estimatedDeliveryYear: '2021',
      groupBuyStartDate: new Date('2021-03-01'),
      groupBuyEndDate: new Date('2021-12-02'),
      layout: 'ANSI',
      status: 'INTEREST_CHECK',
      type: 'KEYCAP_SET',
      brand: 'GMK',
      designer: {
        connect: {
          id: user3.id,
        },
      },
    },
  })

  const product3 = await prisma.product.create({
    data: {
      id: nextId(),
      name: 'Product 2',
      description: 'Product 2 description',
      price: 200,
      estimatedDeliveryQuarter: 'Q2',
      estimatedDeliveryYear: '2023',
      groupBuyStartDate: new Date('2021-02-01'),
      groupBuyEndDate: new Date('2021-12-02'),
      layout: 'ANSI',
      status: 'INTEREST_CHECK',
      type: 'KEYCAP_SET',
      brand: 'JTK',
    },
  })

  const product4 = await prisma.product.create({
    data: {
      id: nextId(),
      name: 'Product 3',
      description: 'Product 3 description',
      price: 300,
      estimatedDeliveryQuarter: 'Q3',
      estimatedDeliveryYear: '2024',
      groupBuyStartDate: new Date('2021-03-01'),
      groupBuyEndDate: new Date('2021-12-02'),
      layout: 'ANSI',
      status: 'GROUP_BUY',
      type: 'KEYBOARD',
      brand: 'JTK',
    },
  })

  const product5 = await prisma.product.create({
    data: {
      id: nextId(),
      name: 'Product 4',
      description: 'Product 4 description',
      price: 400,
      estimatedDeliveryQuarter: 'Q4',
      estimatedDeliveryYear: '2025',
      groupBuyStartDate: new Date('2021-04-01'),
      groupBuyEndDate: new Date('2021-12-02'),
      layout: 'ANSI',
      status: 'GROUP_BUY',
      type: 'KEYBOARD',
      brand: 'JTK',
    },
  })

  const keycap1 = await prisma.keycapSet.create({
    data: {
      material: 'ABS',
      profile: 'SA',
      product: {
        connect: {
          id: product2.id,
        },
      },
    },
  })

  const keyboard2 = await prisma.keyboard.create({
    data: {
      product: {
        connect: {
          id: product1.id,
        },
      },
    },
  })

  const keyboard3 = await prisma.keyboard.create({
    data: {
      product: {
        connect: {
          id: product4.id,
        },
      },
    },
  })

  const keyboard4 = await prisma.keyboard.create({
    data: {
      product: {
        connect: {
          id: product5.id,
        },
      },
    },
  })

  const productVendor1 = await prisma.productVendor.create({
    data: {
      product: {
        connect: {
          id: product1.id,
        },
      },
      vendor: {
        connect: {
          id: vendor1.id,
        },
      },
    },
  })

  const productVendor2 = await prisma.productVendor.create({
    data: {
      product: {
        connect: {
          id: product2.id,
        },
      },
      vendor: {
        connect: {
          id: vendor2.id,
        },
      },
    },
  })

  const productVendor3 = await prisma.productVendor.create({
    data: {
      product: {
        connect: {
          id: product3.id,
        },
      },
      vendor: {
        connect: {
          id: vendor1.id,
        },
      },
    },
  })

  const productVendor4 = await prisma.productVendor.create({
    data: {
      product: {
        connect: {
          id: product4.id,
        },
      },
      vendor: {
        connect: {
          id: vendor2.id,
        },
      },
    },
  })

  const productVendor5 = await prisma.productVendor.create({
    data: {
      product: {
        connect: {
          id: product5.id,
        },
      },
      vendor: {
        connect: {
          id: vendor1.id,
        },
      },
    },
  })

  const formField1 = nextId()
  const formField2 = nextId()
  const formField3 = nextId()
  const formField4 = nextId()
  const formField5 = nextId()
  const formField6 = nextId()

  const formAnswer1 = nextId()
  const formAnswer2 = nextId()
  const formAnswer3 = nextId()
  const formAnswer4 = nextId()
  const formAnswer5 = nextId()
  const formAnswer6 = nextId()
  const formAnswer7 = nextId()
  const formAnswer8 = nextId()
  const formAnswer9 = nextId()

  const form1 = await prisma.form.create({
    data: {
      id: nextId(),
      name: 'Form 1',
      description: 'Form 1 description',
      startDate: new Date('2021-01-01'),
      endDate: new Date('2021-12-02'),
      product: { connect: { id: product1.id } },
      createdBy: {
        connect: {
          id: user2.id,
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
      responses: {
        createMany: {
          data: [
            {
              id: formAnswer1,
              booleanValue: true,
              userId: user1.id,
              fieldId: formField6,
            },
            {
              id: formAnswer2,
              numberValue: 123,
              userId: user1.id,
              fieldId: formField3,
            },
            {
              id: formAnswer3,
              textValue: 'Text 1 answer',
              userId: user1.id,
              fieldId: formField1,
            },
            {
              id: formAnswer4,
              textValue: 'TextArea 2 answer',
              userId: user1.id,
              fieldId: formField2,
            },
            {
              id: formAnswer5,
              userId: user1.id,
              fieldId: formField4,
            },
            {
              id: formAnswer6,
              userId: user1.id,
              fieldId: formField5,
            },
            {
              id: formAnswer7,
              userId: user1.id,
              fieldId: formField4,
            },
            {
              id: formAnswer8,
              userId: user1.id,
              fieldId: formField5,
            },
            {
              id: formAnswer9,
              userId: user1.id,
              fieldId: formField4,
            },
          ],
        },
      },
    },
  })

  const formListValue1 = nextId()
  const formListValue2 = nextId()
  const formListValue3 = nextId()
  const formListValue4 = nextId()
  const formListValue5 = nextId()

  await prisma.fieldValue.createMany({
    data: [
      {
        id: formListValue1,
        value: 'Select 4 answer 1',
        position: 0,
        parentFieldId: formField4,
      },
      {
        id: formListValue2,
        value: 'Select 4 answer 2',
        position: 1,
        parentFieldId: formField4,
      },
      {
        id: formListValue3,
        value: 'Select 4 answer 3',
        position: 2,
        parentFieldId: formField4,
      },
      {
        id: formListValue4,
        value: 'Radio 5 answer 1',
        position: 0,
        parentFieldId: formField5,
      },
      {
        id: formListValue5,
        value: 'Radio 5 answer 2',
        position: 1,
        parentFieldId: formField5,
      },
    ],
  })

  await prisma.fieldValueResponse.createMany({
    data: [
      {
        responseId: formAnswer5,
        valueId: formListValue1,
      },
      {
        responseId: formAnswer7,
        valueId: formListValue2,
      },
      {
        responseId: formAnswer9,
        valueId: formListValue3,
      },
      {
        responseId: formAnswer6,
        valueId: formListValue4,
      },
      {
        responseId: formAnswer8,
        valueId: formListValue5,
      },
    ],
  })

  await prisma.userProductFavorite.createMany({
    data: [
      {
        userId: user1.id,
        productId: product1.id,
      },
      {
        userId: user1.id,
        productId: product2.id,
      },
      {
        userId: user1.id,
        productId: product3.id,
      },
      {
        userId: user1.id,
        productId: product4.id,
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
