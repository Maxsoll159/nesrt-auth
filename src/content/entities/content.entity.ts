import { MinLength } from "class-validator";
import { SesionCourse } from "src/courses/entities/course-session.entity";
import { Question } from "src/questions/entities/question.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Content {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("text")
    @MinLength(1)
    name: string;
    
    @Column("text")
    urlVideo?: string;

    @Column("text")
    urlMaterials?: string[];

    @ManyToOne(
        ()=> SesionCourse,
        sesionCouse => sesionCouse.content
    )
    session: SesionCourse

    @OneToMany(
        ()=>Question,
        question => question.content
    )
    question: Question[]
}   
