import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Courses } from './entities/course.entity';
import { SesionCourse } from './entities/course-session.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';



@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
  imports: [TypeOrmModule.forFeature([Courses, SesionCourse, Teacher])]
})
export class CoursesModule { }
