import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { DB_NAME, DB_PASS, DB_PORT, DB_USERNAME, POSTGRES_HOST } from './utils/config';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: POSTGRES_HOST,
      port: parseInt(DB_PORT),
      username: DB_USERNAME,
      password: DB_PASS,
      database: DB_NAME,
      entities: [User],
      synchronize: true,
      autoLoadEntities: true
    })],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
