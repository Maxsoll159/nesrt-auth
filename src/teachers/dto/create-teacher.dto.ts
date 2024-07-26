import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateTeacherDto {
    @IsString()
    @MinLength(1)
    name: string

    @IsString()
    @MinLength(1)
    lastname: string

    @IsString()
    @MinLength(1)
    Mlastname: string

    @IsString()
    @IsOptional()
    description: string;

    
}
