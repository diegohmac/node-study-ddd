import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    title: 'New Title',
    content: 'New Content',
    authorId: new UniqueEntityID('1'),
    slug: Slug.create('new-title'),
    ...override,
  });

  return question;
}
