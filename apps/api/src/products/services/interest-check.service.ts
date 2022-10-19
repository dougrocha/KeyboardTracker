import { Injectable } from '@nestjs/common'

@Injectable()
export class InterestCheckService {
  create(data) {
    return 'This action adds a new interestCheck'
  }

  findAll() {
    return `This action returns all interestCheck`
  }

  findOne(id: number) {
    return `This action returns a #${id} interestCheck`
  }

  update(id: number, data) {
    return `This action updates a #${id} interestCheck`
  }

  remove(id: number) {
    return `This action removes a #${id} interestCheck`
  }

  findAllAnswers() {
    return `This action returns all interestCheck answers`
  }
}
