import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Courses } from './entities/course.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid'
import { SesionCourse } from './entities/course-session.entity';


@Injectable()
export class CoursesService {
  //Manejar Errores
  private readonly logger = new Logger('CoursesService')

  constructor(
    @InjectRepository(Courses)
    private readonly coursesRepository: Repository<Courses>,

    @InjectRepository(SesionCourse)
    private readonly sesionCourseRepository:Repository<SesionCourse>

  ) { }

  async create(createCourseDto: CreateCourseDto) {

    try {

      const { sesiones = [], ...cousesDetails } = createCourseDto;

      const course = this.coursesRepository.create({
        ...cousesDetails,
        sesiones: sesiones.map(sesion => this.sesionCourseRepository.create({name: sesion.name}))
      })

      await this.coursesRepository.save(course)
      return course

    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(error.detail)
      }

      this.logger.error(error)
      throw new InternalServerErrorException()
    }
  }

  findAll(paginationDto: PaginationDto) {
    //Paginacion
    return this.coursesRepository.find({
      take: paginationDto.limit,
      skip: paginationDto.offset,
    })
  }

  async findOne(term: string) {
    let course: Courses;

    if (isUUID(term)) {
      course = await this.coursesRepository.findOneBy({ id: term })
    } else {
      course = await this.coursesRepository.findOneBy({ slug: term })
    }



    if (!course) throw new NotFoundException(`Curso con el id ${term} no encontrado`)

    return course
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    //BUSCA UN PRODUCTIO POR EL UID Y CARGA LKS PROPIEDADES
    const course = await this.coursesRepository.preload({
      id: id,
      ...updateCourseDto
    })

    if (!course) {
      throw new NotFoundException(`El curso no existe`)
    }

    try {
      await this.coursesRepository.save(course)
      return course
    } catch (error) {
      throw new NotFoundException(`ERROR`)
    }


  }

  async remove(id: string) {

    const course = await this.coursesRepository.findOneBy({ id: id })
    if (!course) throw new NotFoundException(`Curso con el id ${id} no encontrado`)

    return this.coursesRepository.remove(course);
  }
}
