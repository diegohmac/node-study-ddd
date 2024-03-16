import { QuestionsRepository } from '../repositories/questions-repository';

interface EditQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
  questionId: string;
}

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
    questionId,
  }: EditQuestionUseCaseRequest): Promise<void> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error('Question not found');
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('You are not allowed to edit this question');
    }

    question.title = title;
    question.content = content;

    this.questionsRepository.save(question);
  }
}
