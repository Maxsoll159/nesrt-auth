import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Courses } from "./course.entity";
import { Content } from "src/content/entities/content.entity";

@Entity()
export class SesionCourse {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @ManyToOne(
        () => Courses,
        course => course.sesiones
    )
    course: Courses


    @OneToMany(
        () => Content,
        content => content.session,
        { cascade: true, eager: true }
    )
    content: Content[]

}