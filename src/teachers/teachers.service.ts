import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
import { Courses } from 'src/courses/entities/course.entity';

@Injectable()
export class TeachersService {

  constructor(
    @InjectRepository(Teacher)
    private readonly teacheRepository: Repository<Teacher>,


    @InjectRepository(Courses)
    private readonly courseRepository: Repository<Courses>,
  ) { }

  async create(createTeacherDto: CreateTeacherDto, id: string) {
    const course = await this.courseRepository.findOneBy({ id: id })
    const teacher = this.teacheRepository.create({
      ...createTeacherDto,
      course: [course]
    });
    await this.teacheRepository.save(teacher)
    return teacher
  }

  async findAll() {
   const teachers = await this.teacheRepository.find({
      relations: ['course']
   })
   return teachers
  }

  async findOne(term: string) {
    const teacher = await this.teacheRepository.findOne({
      where: { id: term },
      relations: ['course']
    })
    return teacher
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
