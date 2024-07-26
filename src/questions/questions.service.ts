import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { Content } from 'src/content/entities/content.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository : Repository<Question>,

    @InjectRepository(Content)
    private readonly contentCourse : Repository<Content>
  ){}

  async create(createQuestionDto: CreateQuestionDto, id: string) {
    const contentCourse = await this.contentCourse.findOneBy({id: id})
    const question = this.questionRepository.create({...createQuestionDto, content: contentCourse})
    this.questionRepository.save(question)
    return question
  }

  findAll() {
    return `This action returns all questions`;
  }

  async findOne(id: string) {
    console.log("id", id)
    const questionId = await this.questionRepository.findOneBy({id: id})
    console.log("questionId", questionId)
    return questionId;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
