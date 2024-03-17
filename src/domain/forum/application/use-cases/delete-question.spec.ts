import { InMemoryQuestionsRepository } from '@/tests/repositories/in-memory-questions-repository';
import { DeleteQuestionUseCase } from './delete-question';
import { makeQuestion } from '@/tests/factories/make-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from './errors/not-allowed-error';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase; // sut: system under test

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to delete a question', async () => {
    const questionId = 'question-1';
    const authorId = 'author-id';
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID(authorId) },
      new UniqueEntityID(questionId)
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({ questionId, authorId });

    expect(inMemoryQuestionsRepository.items.length).toBe(0);
  });

  it('should not be able to delete a question from another user', async () => {
    const questionId = 'question-1';
    const authorId = 'author-id-1';
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID(authorId) },
      new UniqueEntityID(questionId)
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({ questionId, authorId: 'author-id-2' });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
