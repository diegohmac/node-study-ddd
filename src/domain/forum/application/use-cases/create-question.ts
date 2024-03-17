import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionsRepository } from '../repositories/questions-repository';
import { Question } from '../../enterprise/entities/question';
import { Either, right } from '@/core/either';

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
}

type CreateQuestionUseCaseResponse = Either<null, { question: Question }>;

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      title,
      content,
      authorId: new UniqueEntityID(authorId),
    });

    this.questionsRepository.create(question);

    return right({ question });
  }
}
