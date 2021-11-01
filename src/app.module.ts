import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { AppService } from './app.service';
import { Student } from './students/models/student';
import { StudentModule } from './students/std.module';
import { AppController } from './app.controller';
import { Config } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: Config.postgres.host,
      port: Config.postgres.port,
      username: 'postgres',
      password: 'postgres',
      database: 'student',
      entities: [Student],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
