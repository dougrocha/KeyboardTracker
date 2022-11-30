import { Form, Prisma } from '@meka/database'
import { PaginationParams, PaginatedResults, MaybePaginated } from '@meka/types'
import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

import { PRISMA_SERVICE, SNOWFLAKE_SERVICE } from '../../common/constants'
import BaseService from '../../common/interfaces/base-service.interface'
import { SnowflakeService } from '../../snowflake/snowflake.module'
import { CreateFormFieldValueDto } from '../dtos/create-form-field-values.dto'
import { CreateFormFieldDto } from '../dtos/create-form-field.dto'
import { CreateFormDto } from '../dtos/create-form.dto'
import { UpdateFormFieldDto } from '../dtos/update-form-field.dto'
import { UpdateFormDto } from '../dtos/update-form.dto'

@Injectable()
export class FormService implements BaseService<Form> {
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

  findMany(): Promise<Form[]>
  findMany(params?: PaginationParams): Promise<PaginatedResults<Form>>
  findMany(_params?: unknown): Promise<MaybePaginated<Form>> {
    throw new Error(
      'Forms are unique to products. Please use `findOne` instead',
    )
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
    return await this.prisma.fieldValue.createMany({
      data: values.map((value) => ({
        id: this.snowflake.nextId(),
        product: { connect: { id: productId } },
        formId,
        parentFieldId,
        ...value,
      })),
    })
  }

  async findOne(id: string) {
    return this.prisma.form.findUnique({
      where: { id },
    })
  }

  async delete(id: string): Promise<Form> {
    return this.prisma.form.delete({
      where: { id },
    })
  }

  async deleteField(id: string) {
    return this.prisma.formField.delete({
      where: { id },
    })
  }

  async deleteFieldValue(id: string) {
    return this.prisma.fieldValue.delete({
      where: { id },
    })
  }

  async findFormAnswers(formId: string) {
    return this.prisma.form.findUnique({
      where: { id: formId },
      include: {
        responses: {
          orderBy: { answeredAt: 'desc' },
          include: { field: true, fieldValueResponses: true },
        },
      },
    })
  }

  async findProductForm(productId: string, includeFields?: Prisma.FormInclude) {
    return this.prisma.form.findUnique({
      where: { productId },
      include: includeFields,
    })
  }

  async findProductFormWithFields(productId: string) {
    return this.findProductForm(productId, { fields: true })
  }

  async findProductFormWithFieldsAndValues(productId: string) {
    return this.findProductForm(productId, {
      fields: { include: { values: true } },
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
}
