import { Module } from '@nestjs/common';
import { CommentsModule } from '../comments/comments.module';
import { ThreadsModule } from '../threads/threads.module';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { Thread } from 'src/threads/entity/thread.entity';
import { Comment } from 'src/comments/entity/comment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [User, Thread, Comment],
        synchronize: true,
        logging: true,
      }),
    }),

    CommentsModule,
    ThreadsModule,
    AuthModule,
  ],
})
export class AppModule {}
