import { faker } from '@faker-js/faker';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionProps } from '@/domain/forum/enterprise/entities/question';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';

export function makeQuestionComment(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID
) {
  const questionComment = QuestionComment.create(
    {
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id
  );

  return questionComment;
}
