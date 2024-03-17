import { PaginationParams } from '@/core/repositories/pagination-params';
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = [];

  async findById(id: string) {
    return (
      this.items.find(
        (questionComment) => questionComment.id.toString() === id
      ) || null
    );
  }

  async findManyByQuestionId(questionId: string, params: PaginationParams) {
    const { page } = params;
    const questionComments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return questionComments;
  }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment);
  }

  async delete(questionComment: QuestionComment) {
    const index = this.items.findIndex(
      (item) => item.id === questionComment.id
    );

    this.items.splice(index, 1);
  }
}
