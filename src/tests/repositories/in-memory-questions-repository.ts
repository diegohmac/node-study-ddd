import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];

  async findById(id: string) {
    return this.items.find((question) => question.id.toString() === id) || null;
  }

  async findBySlug(slug: string) {
    return this.items.find((question) => question.slug.value === slug) || null;
  }

  async create(question: Question) {
    this.items.push(question);
  }

  async save(question: Question) {
    const index = this.items.findIndex((item) => item.id === question.id);
    this.items[index] = question;
  }

  async delete(question: Question) {
    const index = this.items.findIndex((item) => item.id === question.id);

    this.items.splice(index, 1);
  }
}
