import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { SesionCourse } from 'src/courses/entities/course-session.entity';

@Module({
  controllers: [ContentController],
  providers: [ContentService],
  imports: [TypeOrmModule.forFeature([Content, SesionCourse])]
})
export class ContentModule {}
