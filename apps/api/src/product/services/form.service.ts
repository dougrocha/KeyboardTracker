import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

import { PRISMA_SERVICE, SNOWFLAKE_SERVICE } from '../../common/constants'
import { SnowflakeService } from '../../snowflake/snowflake.module'
import { CreateFormFieldValueDto } from '../dtos/create-form-field-values.dto'
import { CreateFormFieldDto } from '../dtos/create-form-field.dto'
import { CreateFormDto } from '../dtos/create-form.dto'
import { UpdateFormFieldDto } from '../dtos/update-form-field.dto'
import { UpdateFormDto } from '../dtos/update-form.dto'

@Injectable()
export class FormService {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaService,
    @Inject(SNOWFLAKE_SERVICE) private readonly snowflake: SnowflakeService,
  ) {}

  async create({ productId, createdById, ...data }: CreateFormDto) {
    return await this.prisma.form.create({
      data: {
        id: this.snowflake.nextId(),
        product: { connect: { id: productId } },
        createdBy: { connect: { id: createdById } },
        ...data,
      },
    })
  }

  async createField(
    productId: string,
    formId: string,
    fields: CreateFormFieldDto[],
  ) {
    return await this.prisma.formField.createMany({
      data: fields.map((field) => ({
        id: this.snowflake.nextId(),
        product: { connect: { id: productId } },
        formId,
        ...field,
      })),
    })
  }

  async createFieldValue(
    productId: string,
    formId: string,
    parentFieldId: string,
    values: CreateFormFieldValueDto[],
  ) {
    await this.prisma.fieldValue.create({
      data: { position: 0, value: 'test', parentFieldId },
    })
    return await this.prisma.fieldValue.createMany({
      data: values.map((value) => ({
        id: this.snowflake.nextId(),
        productId,
        parentFieldId,
        ...value,
      })),
    })
  }

  async findAll() {
    return await this.prisma.form.findMany()
  }

  async findOne(id: string) {
    return await this.prisma.form.findUnique({
      where: { id },
    })
  }

  async findOneByProductId(id: string) {
    return await this.prisma.form.findUnique({
      where: { productId: id },
      include: {
        fields: {
          select: {
            id: true,
            description: true,
            name: true,
            type: true,
            required: true,
            position: true,
            values: true,
            _count: true,
          },
          orderBy: {
            position: 'asc',
          },
        },
      },
    })
  }

  async update(id: string, form: UpdateFormDto) {
    return await this.prisma.form.update({
      where: { id },
      data: {
        ...form,
      },
    })
  }

  async updateField(id: string, field: UpdateFormFieldDto) {
    return await this.prisma.formField.update({
      where: { id },
      data: field,
    })
  }

  async updateFieldValue(id: string, value: string) {
    return await this.prisma.fieldValue.update({
      where: { id },
      data: { value },
    })
  }

  async remove(id: string) {
    return await this.prisma.form.delete({
      where: { id },
    })
  }

  async findAllAnswersByFormId(id: string) {
    return await this.prisma.form.findUnique({
      where: { id },
      include: {
        responses: {
          orderBy: { answeredAt: 'desc' },
          include: { field: true, fieldValueResponses: true },
        },
      },
    })
  }
}
