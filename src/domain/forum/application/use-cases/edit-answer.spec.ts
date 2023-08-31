import { makeAnswer } from '@/test/factories/make-answer'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from './edit-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let editAnswerUseCase: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    editAnswerUseCase = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await editAnswerUseCase.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
      content: 'Novo conteudo',
    })

    expect(inMemoryAnswersRepository.answers[0]).toMatchObject({
      content: 'Novo conteudo',
    })
  })

  it('should not be able to edit a non existent answer', async () => {
    await expect(() =>
      editAnswerUseCase.execute({
        answerId: 'answer-1',
        authorId: 'author-1',
        content: 'Novo conteudo',
      }),
    ).rejects.toEqual(new Error('Answer not found.'))
  })

  it('should not be able to edit a answer from another author', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await expect(() =>
      editAnswerUseCase.execute({
        answerId: 'answer-1',
        authorId: 'author-2',
        content: 'Novo conteudo',
      }),
    ).rejects.toEqual(new Error('Not allowed.'))
  })
})
