import { IsArray, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateContentDto {
    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @IsOptional()
    urlVideo?: string;

    @IsString({each: true})
    @IsArray()
    @IsOptional()
    urlMaterials?: string[]

}
