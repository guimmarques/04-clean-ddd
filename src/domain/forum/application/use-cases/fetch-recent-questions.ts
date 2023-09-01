import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface FetchRecentQuestionsUseCaseRequest {
  page: number
}

interface FetchRecentQuestionsUseCaseResponse {
  questions: Question[]
}

export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute(
    data: FetchRecentQuestionsUseCaseRequest,
  ): Promise<FetchRecentQuestionsUseCaseResponse> {
    const { page } = data

    const questions = await this.questionsRepository.findManyRecent({ page })

    return {
      questions,
    }
  }
}
