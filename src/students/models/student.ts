import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { NewStudentInput } from '../dtos/new.student.input';

@Entity()
@ObjectType({ description: 'student' })
export class Student {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column()
  firstName: string;

  @Field({ nullable: true })
  @Column()
  lastName: string;

  @Field({ nullable: true })
  @Column()
  dbo: Date;

  @Column({ default: true })
  isActive: boolean;
}

export function toStudent(std: NewStudentInput) {
  const student: Student = new Student();
  student.firstName = std.firstName;
  student.lastName = std.lastName;
  student.dbo = new Date(std.dbo);
  return student;
}

