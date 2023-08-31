import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  questions: Question[] = []

  async findById(id: string): Promise<Question | null> {
    const question = this.questions.find(
      (question) => question.id.toString() === id,
    )

    if (!question) {
      return null
    }

    return question
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.questions.find(
      (question) => question.slug.value === slug,
    )

    if (!question) {
      return null
    }

    return question
  }

  async create(question: Question): Promise<void> {
    this.questions.push(question)
  }

  async delete(question: Question): Promise<void> {
    const questionIndex = this.questions.findIndex(
      (questionMemory) => questionMemory.id === question.id,
    )

    this.questions.splice(questionIndex, 1)
  }
}
