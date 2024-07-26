import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post(":id")
  create(@Body() createTeacherDto: CreateTeacherDto, @Param("id") id: string) {
    return this.teachersService.create(createTeacherDto, id);
  }

  @Get()
  findAll() {
    return this.teachersService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.teachersService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teachersService.update(+id, updateTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teachersService.remove(+id);
  }
}
