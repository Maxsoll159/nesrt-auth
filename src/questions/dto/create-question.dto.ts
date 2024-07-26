import { IsString, MinLength } from "class-validator";

export class CreateQuestionDto {

    @IsString()
    @MinLength(1)
    question: string

}
