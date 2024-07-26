import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SesionCourse } from "./course-session.entity";
import { Teacher } from "src/teachers/entities/teacher.entity";

@Entity()
export class Courses {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    title: string

    @Column("text")
    image: string

    @Column("text")
    description: string

    @Column("float", {
        default: 0
    })
    price: number

    @Column('text', {
        unique: true
    })
    slug?: string

    @OneToMany(
        () => SesionCourse,
        sesionCourse => sesionCourse.course,
        {cascade: true, eager: true}
    )
    sesiones?: SesionCourse[]

    @ManyToOne(
        () => Teacher,
        teacher => teacher.course,
        {cascade: true, eager: true}
    )
    teacher: Teacher
    


    @BeforeInsert()
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.slug
        }

        this.slug = this.slug.toLowerCase().replaceAll(" ", "_").replaceAll("'", "_")
    }

    @BeforeUpdate()
    validateSlugUpdate() {
        if (!this.slug) {
            this.slug = this.slug
        }

        this.slug = this.slug.toLowerCase().replaceAll(" ", "_").replaceAll("'", "_")
    }

}