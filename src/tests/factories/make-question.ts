import { faker } from '@faker-js/faker';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID
) {
  const question = Question.create(
    {
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      authorId: new UniqueEntityID(),
      slug: Slug.create('new-title'),
      ...override,
    },
    id
  );

  return question;
}
