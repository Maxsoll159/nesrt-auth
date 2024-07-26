import { MinLength } from "class-validator";
import { Content } from "src/content/entities/content.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Question {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column("text")
    @MinLength(1)
    question: string

    @ManyToOne(
        () => Content,
        content => content.question
    )
    content: Content
}
