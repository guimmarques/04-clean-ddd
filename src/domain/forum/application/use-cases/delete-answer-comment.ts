import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute(
    data: DeleteAnswerCommentUseCaseRequest,
  ): Promise<DeleteAnswerCommentUseCaseResponse> {
    const { authorId, answerCommentId } = data

    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new Error('Answer comment not found.')
    }

    if (authorId !== answerComment.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    await this.answerCommentsRepository.delete(answerComment)

    return {}
  }
}
