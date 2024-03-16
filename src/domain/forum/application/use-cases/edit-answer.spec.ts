import { InMemoryAnswersRepository } from '@/tests/repositories/in-memory-answers-repository';
import { makeAnswer } from '@/tests/factories/make-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { EditAnswerUseCase } from './edit-answer';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase; // sut: system under test

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it('should be able to edit a answer', async () => {
    const answerId = 'answer-1';
    const authorId = 'author-id';
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID(authorId) },
      new UniqueEntityID(answerId)
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      authorId,
      answerId,
      content: 'Edited content',
    });

    expect(inMemoryAnswersRepository.items[0]).toEqual(
      expect.objectContaining({
        content: 'Edited content',
      })
    );
  });

  it('should not be able to edit a answer from another user', async () => {
    const answerId = 'answer-1';
    const authorId = 'author-id-1';
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID(authorId) },
      new UniqueEntityID(answerId)
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await expect(
      sut.execute({
        authorId: 'author-id-2',
        answerId,
        content: 'Edited content',
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
