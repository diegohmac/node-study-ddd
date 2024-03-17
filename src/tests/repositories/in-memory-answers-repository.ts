import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];

  async findById(id: string) {
    return this.items.find((answer) => answer.id.toString() === id) || null;
  }

  async findManyByQuestionId(questionId: string, params: PaginationParams) {
    const { page } = params;
    const answers = this.items
      .filter((answer) => answer.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return answers;
  }

  async create(answer: Answer) {
    this.items.push(answer);
  }

  async save(answer: Answer) {
    const index = this.items.findIndex((item) => item.id === answer.id);
    this.items[index] = answer;
  }

  async delete(answer: Answer) {
    const index = this.items.findIndex((item) => item.id === answer.id);

    this.items.splice(index, 1);
  }
}
