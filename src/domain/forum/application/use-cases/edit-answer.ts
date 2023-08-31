import { AnswersRepository } from '../repositories/answers-repository'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface EditAnswerUseCaseResponse {}

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute(
    data: EditAnswerUseCaseRequest,
  ): Promise<EditAnswerUseCaseResponse> {
    const { answerId, content, authorId } = data

    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    answer.content = content

    await this.answersRepository.save(answer)

    return {}
  }
}
