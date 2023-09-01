import { makeQuestion } from '@/test/factories/make-question'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { makeAnswer } from '@/test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let fetchQuestionAnswersUseCase: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    fetchQuestionAnswersUseCase = new FetchQuestionAnswersUseCase(
      inMemoryAnswersRepository,
    )
  })

  it('should be able to fetch question answers', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('question-1') }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('question-1') }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('question-2') }),
    )

    const { answers } = await fetchQuestionAnswersUseCase.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(answers).toHaveLength(2)
  })

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 30; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({ questionId: new UniqueEntityID('question-1') }),
      )
    }

    const { answers } = await fetchQuestionAnswersUseCase.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(answers).toHaveLength(10)
  })
})
