import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewStudentInput } from '../dtos/new.student.input';
import { Student, toStudent } from '../models/student';

@Injectable()
export class StudentService {
  private readonly logger = new Logger(StudentService.name);

  constructor(
    @InjectRepository(Student)
    private stdRepository: Repository<Student>,
  ) {}

  findAll(): Promise<Student[]> {
    return this.stdRepository.find();
  }

  findOne(id: number): Promise<Student> {
    return this.stdRepository.findOne(id);
  }

  addOne(std: NewStudentInput): Promise<Student> {
    return this.stdRepository.save(toStudent(std));
  }

  addBulk(stds: NewStudentInput[]): Promise<Student[]> {
    const students = stds.map((i) => {
      return toStudent(i);
    });
    return this.stdRepository.save(students);
  }

  updateOne(id: number, std: NewStudentInput): Promise<Student> {
    let stud = toStudent(std);
    stud.id = id;
    return this.stdRepository.save(stud);
  }

  remove(ids: number[]): Promise<any> {
    return this.stdRepository.delete(ids);
  }

}
