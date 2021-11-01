import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class NewStudentInput {
  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  dbo: string;
}
  