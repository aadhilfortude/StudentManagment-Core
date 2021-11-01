import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NewStudentInput } from '../dtos/new.student.input';
import { Student } from '../models/student';
import { StudentService } from './student.service';

describe('StudentService', () => {
  let stdService: StudentService;
  const newStudentInput: NewStudentInput = {
    firstName: 'fake-first',
    lastName: 'fake-last',
    dbo: '1995-09-06',
  };

  const student: Student = {
    id: 1,
    firstName: 'fake-first',
    lastName: 'fake-last',
    dbo: new Date('1995-09-06'),
    isActive: true,
  };

  const studentRepo = {
    findOne: jest.fn(() => {
      return {
        ...newStudentInput,
      };
    }),
    find: jest.fn().mockImplementation(() => Promise.resolve([student])),
    delete: jest.fn().mockImplementation((std) => student),
    save: jest
      .fn()
      .mockImplementationOnce((std) => Promise.resolve([student]))
      .mockImplementationOnce((std) => Promise.resolve({ ...student })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(Student),
          useValue: studentRepo,
        },
      ],
    }).compile();

    stdService = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(stdService).toBeDefined();
  });

  it('should return all students', async () => {
    expect(await stdService.findAll()).toEqual([student]);
  });

  it('should create list of students and return the students', async () => {
    expect(await stdService.addBulk([newStudentInput])).toEqual([student]);
  });

  it('should delete student', async () => {
    expect(await stdService.remove([1])).toEqual({ ...student });
  });

  it('should update student and return record', async () => {
    expect(await stdService.updateOne(1, newStudentInput)).toEqual({
      ...student,
    });
  });
});
