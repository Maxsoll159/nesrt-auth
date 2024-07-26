import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './courses/courses.module';
import { CommonModule } from './common/common.module';
import { ContentModule } from './content/content.module';
import { TeachersModule } from './teachers/teachers.module';
import { QuestionsModule } from './questions/questions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.BD_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true //EM PRD NO
    }),
    CoursesModule,
    CommonModule,
    ContentModule,
    TeachersModule,
    QuestionsModule,
    AuthModule
  ],

})
export class AppModule { }
