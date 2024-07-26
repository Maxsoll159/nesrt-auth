import { Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { Repository } from 'typeorm';
import { SesionCourse } from 'src/courses/entities/course-session.entity';

@Injectable()
export class ContentService {

  constructor(
    @InjectRepository(Content)
    private readonly contentRespository: Repository<Content>,

    @InjectRepository(SesionCourse)
    private readonly sesionCourseRepository: Repository<SesionCourse>
  ) { }

  async create(createContentDto: CreateContentDto, sessionId: any) {
    const session = await this.sesionCourseRepository.findOneBy({ id: sessionId });
    console.log("XDDD", session)
    const content = this.contentRespository.create({ ...createContentDto, session })
    await this.contentRespository.save(content)
    return session
  }

  async findAll() {
    const contentCourse = await this.contentRespository.find({
      relations: ["question"]
    })
    return contentCourse
  }

  findOne(id: number) {
    return `This action returns a #${id} content`;
  }

  update(id: number, updateContentDto: UpdateContentDto) {
    return `This action updates a #${id} content`;
  }

  remove(id: number) {
    return `This action removes a #${id} content`;
  }
}
