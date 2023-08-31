import { makeQuestion } from '@/test/factories/make-question'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let getQuestionBySlug: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    getQuestionBySlug = new GetQuestionBySlugUseCase(
      inMemoryQuestionsRepository,
    )
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      title: 'Pergunta de Exemplo',
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await getQuestionBySlug.execute({
      slug: 'pergunta-de-exemplo',
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
  })

  it('should not be able to get a question by a non existent slug', async () => {
    await expect(() =>
      getQuestionBySlug.execute({
        slug: 'pergunta-de-exemplo',
      }),
    ).rejects.toEqual(new Error('Question not found.'))
  })
})
