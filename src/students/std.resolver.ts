import { Logger } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewStudentInput } from './dtos/new.student.input';
import { Student } from './models/student';
import { StudentService } from './services/student.service';

@Resolver((of) => Student)
export class StudentResolver {
  private readonly logger = new Logger(StudentResolver.name);

  constructor(private stdService: StudentService) {}

  @Query((returns) => [Student])
  async students() {
    this.logger.log(new Date().toUTCString() + ' - ' + 'execute students()');

    try {
      return (await this.stdService.findAll()).sort((a, b) => {
        return a.id - b.id;
      });
    } catch (e) {
      this.logger.error(new Date().toUTCString() + ' - ' + e.message);
    }

    return [];
  }

  @Query((returns) => Student)
  async student(@Args('id', { type: () => Int }) id: number) {
    this.logger.log(
      new Date().toUTCString() + ' - ' + 'execute student() for id ' + id,
    );

    try {
      return await this.stdService.findOne(id);
    } catch (e) {
      this.logger.error(new Date().toUTCString() + ' - ' + e.message);
    }

    return null;
  }

  @Mutation((returns) => Student)
  async addStudent(
    @Args('newStudentData') newStudentData: NewStudentInput,
  ): Promise<Student> {
    this.logger.log(new Date().toUTCString() + ' - ' + 'execute addStudent()');

    try {
      return await this.stdService.addOne(newStudentData);
    } catch (e) {
      this.logger.error(new Date().toUTCString() + ' - ' + e.message);
    }

    return null;
  }

  @Mutation((returns) => Student)
  async updateStudent(
    @Args('id', { type: () => Int }) id: number,
    @Args('newStudentData') newStudentData: NewStudentInput,
  ): Promise<any> {
    this.logger.log(
      new Date().toUTCString() + ' - ' + 'execute updateStudent() for id ' + id,
    );

    try {
      return await this.stdService.updateOne(id, newStudentData);
    } catch (e) {
      this.logger.error(new Date().toUTCString() + ' - ' + e.message);
    }

    return null;
  }

  @Mutation((returns) => Boolean)
  async removeStudent(@Args('ids', { type: () => [Int] }) ids: number[]) {
    this.logger.log(
      new Date().toUTCString() +
        ' - ' +
        'execute removeStudent() for ids ' +
        ids.toString(),
    );

    try {
      await this.stdService.remove(ids);
      return true;
    } catch (e) {
      this.logger.error(new Date().toUTCString() + ' - ' + e.message);
    }

    return false;
  }

  @Mutation((returns) => [Student])
  async addStudents(
    @Args('newStudentsData', { type: () => [NewStudentInput] })
    newStudentsData: NewStudentInput[],
  ): Promise<Student[]> {
    this.logger.log(new Date().toUTCString() + ' - ' + 'execute addStudents()');

    try {
      return await this.stdService.addBulk(newStudentsData);
    } catch (e) {
      this.logger.error(new Date().toUTCString() + ' - ' + e.message);
    }

    return [];
  }
}
