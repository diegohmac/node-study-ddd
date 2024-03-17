import { InMemoryQuestionsRepository } from '@/tests/repositories/in-memory-questions-repository';
import { makeQuestion } from '@/tests/factories/make-question';
import { InMemoryQuestionCommentsRepository } from '@/tests/repositories/in-memory-question-comments-repository';
import { CommentOnQuestionUseCase } from './comment-on-question';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: CommentOnQuestionUseCase; // sut: system under test

describe('Comment On Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository
    );
  });

  it('should be able to comment on question', async () => {
    const question = makeQuestion();

    await inMemoryQuestionsRepository.create(question);

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'This is a comment',
    });

    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(
      'This is a comment'
    );
  });
});
