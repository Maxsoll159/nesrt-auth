import { Type } from "class-transformer"
import { IsArray, IsNumber, IsOptional, IsPositive, IsString, MinLength, ValidateNested } from "class-validator"
import { SesionCourse } from "../entities/course-session.entity"

class CreateSesionDto {
    @IsString()
    name: string;
}


export class CreateCourseDto {
    @IsString()
    @MinLength(1)
    title: string

    @IsString()
    @MinLength(1)
    image: string

    @IsString()
    @MinLength(1)
    description: string

    @IsPositive()
    @IsOptional()
    @IsNumber()
    price?: number

    @IsString()
    slug: string


    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSesionDto)
    sesiones: CreateSesionDto[];
}
