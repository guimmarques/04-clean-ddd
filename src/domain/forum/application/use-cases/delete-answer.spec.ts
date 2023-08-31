import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from './delete-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from '@/test/factories/make-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let deleteAnswerUseCase: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    deleteAnswerUseCase = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await deleteAnswerUseCase.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
    })

    expect(inMemoryAnswersRepository.answers).toHaveLength(0)
  })

  it('should not be able to delete a non existent answer', async () => {
    await expect(() =>
      deleteAnswerUseCase.execute({
        answerId: 'answer-1',
        authorId: 'author-1',
      }),
    ).rejects.toEqual(new Error('Answer not found.'))
  })

  it('should not be able to delete a answer from another author', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await expect(() =>
      deleteAnswerUseCase.execute({
        answerId: 'answer-1',
        authorId: 'author-2',
      }),
    ).rejects.toEqual(new Error('Not allowed.'))
  })
})
