import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  answers: Answer[] = []

  async create(question: Answer): Promise<void> {
    this.answers.push(question)
  }
}
