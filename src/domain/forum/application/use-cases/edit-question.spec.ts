import { makeQuestion } from '@/test/factories/make-question'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let editQuestionUseCase: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    editQuestionUseCase = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await editQuestionUseCase.execute({
      questionId: 'question-1',
      authorId: 'author-1',
      title: 'Novo titulo',
      content: 'Novo conteudo',
    })

    expect(inMemoryQuestionsRepository.questions[0]).toMatchObject({
      title: 'Novo titulo',
      content: 'Novo conteudo',
    })
  })

  it('should not be able to edit a non existent question', async () => {
    await expect(() =>
      editQuestionUseCase.execute({
        questionId: 'question-1',
        authorId: 'author-1',
        title: 'Novo titulo',
        content: 'Novo conteudo',
      }),
    ).rejects.toEqual(new Error('Question not found.'))
  })

  it('should not be able to edit a question from another author', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await expect(() =>
      editQuestionUseCase.execute({
        questionId: 'question-1',
        authorId: 'author-2',
        title: 'Novo titulo',
        content: 'Novo conteudo',
      }),
    ).rejects.toEqual(new Error('Not allowed.'))
  })
})
