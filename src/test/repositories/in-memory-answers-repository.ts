import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  answers: Answer[] = []

  async findById(id: string): Promise<Answer | null> {
    const answer = this.answers.find((answer) => answer.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]> {
    const { page } = params

    const answers = this.answers
      .filter((answer) => answer.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async create(answer: Answer): Promise<void> {
    this.answers.push(answer)
  }

  async save(answer: Answer): Promise<void> {
    const answerIndex = this.answers.findIndex(
      (answerMemory) => answerMemory.id === answer.id,
    )

    this.answers[answerIndex] = answer
  }

  async delete(answer: Answer): Promise<void> {
    const answerIndex = this.answers.findIndex(
      (answerMemory) => answerMemory.id === answer.id,
    )

    this.answers.splice(answerIndex, 1)
  }
}
