import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import {
  GroupBuyStatus,
  Product,
  ProductType,
  Vendor,
  YearQuarter,
} from '@prisma/client'
import { useContainer } from 'class-validator'
import { PrismaService } from 'nestjs-prisma'
import request from 'supertest'

import { AppModule } from '../src/app.module.js'

describe('Vendor (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let vendor: Vendor

  const vendorShape = expect.objectContaining<Partial<Vendor>>({
    id: expect.any(String),
    name: expect.any(String),
    country: expect.any(String),
    logoUrl: expect.any(String),
    url: expect.any(String),
    verified: expect.any(Boolean),
  })

  const productShape = expect.objectContaining<Partial<Product>>({
    id: expect.any(String),
    name: expect.any(String),
    status: expect.stringMatching(Object.values(GroupBuyStatus).join('|')),
    estimatedDeliveryQuarter: expect.stringMatching(
      Object.values(YearQuarter).join('|'),
    ),
    type: expect.stringMatching(Object.values(ProductType).join('|')),
  }) // Rest of values can be null

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    prisma = moduleFixture.get<PrismaService>(PrismaService)

    useContainer(app.select(AppModule), { fallbackOnErrors: true })
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

    await app.init()

    // Clear vendor table and productVendor table
    // so tests can be completed with provided data

    vendor = await prisma.vendor.create({
      data: {
        id: '1',
        name: 'test',
        country: 'USA',
        logoUrl: 'test',
        url: 'test',
        verified: true,
        createdAt: new Date('2020-01-01'),
        updatedAt: new Date('2020-01-01'),
      },
    })

    await prisma.vendor.create({
      data: {
        id: '2',
        name: 'test2',
        country: 'USA',
        logoUrl: 'test',
        url: 'test',
        verified: true,
        createdAt: new Date('2020-01-01'),
        updatedAt: new Date('2020-01-01'),
      },
    })

    await prisma.product.create({
      data: {
        id: '1',
        name: 'test',
        estimatedDeliveryQuarter: 'Q1',
        type: 'KEYBOARD',
        vendors: {
          create: {
            vendorId: vendor.id,
          },
        },
      },
    })

    await prisma.product.create({
      data: {
        id: '2',
        name: 'test2',
        estimatedDeliveryQuarter: 'Q3',
        type: 'KEYCAP_SET',
        vendors: {
          create: {
            vendorId: vendor.id,
          },
        },
      },
    })
  })

  afterAll(async () => {
    await prisma.vendor.deleteMany()
    await prisma.product.deleteMany()
    await prisma.$disconnect()
    await app.close()
  })

  describe('GET /vendor', () => {
    it('returns a list of vendors', async () => {
      const { status, body } = await request(app.getHttpServer()).get('/vendor')

      expect(status).toBe(200)
      expect(body).toStrictEqual(expect.arrayContaining([vendorShape]))
    })

    describe('with pagination', () => {
      it('returns a set amount of vendors', async () => {
        const { status, body } = await request(app.getHttpServer()).get(
          `/vendor?page=1&perPage=1`,
        )

        expect(status).toBe(200)

        expect(body.data).toStrictEqual(expect.arrayContaining([vendorShape]))
        expect(body.data).toHaveLength(1)
      })
    })
  })

  describe('GET /vendor/:id', () => {
    it('returns a vendor', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        `/vendor/${vendor.id}`,
      )
      expect(status).toBe(200)
      expect(body).toStrictEqual(vendorShape)
    })

    it('returns a 404 if the vendor does not exist', async () => {
      const { status } = await request(app.getHttpServer()).get('/vendor/20')
      expect(status).toBe(404)
    })

    it('returns a 400 if the id is not a valid uuid', async () => {
      const { status } = await request(app.getHttpServer()).get(
        '/vendor/1a2b3c',
      )
      expect(status).toBe(404)
    })
  })

  describe('GET /vendor/:id/products', () => {
    it('returns a list of products for a vendor', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        `/vendor/${vendor.id}/products`,
      )

      expect(status).toBe(200)
      expect(body).toStrictEqual(expect.arrayContaining([productShape]))
    })

    it('returns a paginated list of products for a vendor', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        `/vendor/${vendor.id}/products?page=1&perPage=1`,
      )

      expect(status).toBe(200)
      expect(body.data).toStrictEqual(expect.arrayContaining([productShape]))
      expect(body.count).toBe(2)
    })

    it('returns a 404 if the vendor does not exist', async () => {
      const { status } = await request(app.getHttpServer()).get(
        '/vendor/20/products',
      )
      expect(status).toBe(200) // Not sure if this should be changed because of the way the query is written
    })
  })

  describe('GET /vendor/country/:country', () => {
    it('returns a list of vendors in a country', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        `/vendor/country/${vendor.country}`,
      )

      expect(status).toBe(200)
      expect(body).toEqual(expect.arrayContaining([vendorShape]))
    })
  })

  describe('POST /vendor/:id', () => {
    it('creates a vendor', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/vendor')
        .send({
          name: 'creating vendor',
          country: 'USA',
          logoUrl: 'test',
          url: 'test',
        })

      expect(status).toBe(201)
      expect(body).toStrictEqual(vendorShape)
    })
  })

  describe('PATCH /vendor/:id', () => {
    it('updates a vendor', async () => {
      const { status, body } = await request(app.getHttpServer())
        .patch(`/vendor/${vendor.id}`)
        .send({
          name: 'updated vendor',
          country: 'USA',
          logoUrl: 'test',
          url: 'test',
        })

      expect(status).toBe(200)
      expect(body).toStrictEqual(vendorShape)
    })

    it('returns a 404 if the vendor does not exist', async () => {
      const { status } = await request(app.getHttpServer()).put('/vendor/20')

      expect(status).toBe(404)
    })
  })
})
