import { InMemoryQuestionsRepository } from '@/tests/repositories/in-memory-questions-repository';
import { makeQuestion } from '@/tests/factories/make-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { EditQuestionUseCase } from './edit-question';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase; // sut: system under test

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to edit a question', async () => {
    const questionId = 'question-1';
    const authorId = 'author-id';
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID(authorId) },
      new UniqueEntityID(questionId)
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      authorId,
      questionId,
      title: 'Edited title',
      content: 'Edited content',
    });

    expect(inMemoryQuestionsRepository.items[0]).toEqual(
      expect.objectContaining({
        title: 'Edited title',
        content: 'Edited content',
      })
    );
  });

  it('should not be able to edit a question from another user', async () => {
    const questionId = 'question-1';
    const authorId = 'author-id-1';
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID(authorId) },
      new UniqueEntityID(questionId)
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await expect(
      sut.execute({
        authorId: 'author-id-2',
        questionId,
        title: 'Edited title',
        content: 'Edited content',
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
