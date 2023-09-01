import { makeAnswer } from '@/test/factories/make-answer'
import { InMemoryAnswerCommentsRepository } from '@/test/repositories/in-memory-answer-comments-repository'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let commentOnAnswerUseCase: CommentOnAnswerUseCase

describe('Comment On Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    commentOnAnswerUseCase = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)

    await commentOnAnswerUseCase.execute({
      authorId: answer.authorId.toString(),
      answerId: answer.id.toString(),
      content: 'Conteúdo do comentário da pergunta',
    })

    expect(inMemoryAnswerCommentsRepository.answerComments[0].content).toEqual(
      'Conteúdo do comentário da pergunta',
    )
  })
})
