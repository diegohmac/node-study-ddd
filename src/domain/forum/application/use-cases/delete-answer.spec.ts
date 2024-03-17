import { InMemoryAnswersRepository } from '@/tests/repositories/in-memory-answers-repository';
import { DeleteAnswerUseCase } from './delete-answer';
import { makeAnswer } from '@/tests/factories/make-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from './errors/not-allowed-error';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase; // sut: system under test

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });

  it('should be able to delete an answer', async () => {
    const answerId = 'answer-1';
    const authorId = 'author-id';
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID(authorId) },
      new UniqueEntityID(answerId)
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({ answerId, authorId });

    expect(inMemoryAnswersRepository.items.length).toBe(0);
  });

  it('should not be able to delete an answer from another user', async () => {
    const answerId = 'answer-1';
    const authorId = 'author-id-1';
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID(authorId) },
      new UniqueEntityID(answerId)
    );

    await inMemoryAnswersRepository.create(newAnswer);

    const result = await sut.execute({ answerId, authorId: 'author-id-2' });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
