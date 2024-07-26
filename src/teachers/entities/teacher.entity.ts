import { IsOptional, MinLength } from "class-validator";
import { Courses } from "src/courses/entities/course.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column("text")
    @MinLength(1)
    name: string

    @Column("text")
    @MinLength(1)
    lastname: string

    @Column("text")
    @MinLength(1)
    Mlastname: string

    @Column("text")
    @IsOptional()
    description: string;
    
    @OneToMany(
        ()=> Courses,
        courses => courses.teacher,
    )
    course: Courses[]


}