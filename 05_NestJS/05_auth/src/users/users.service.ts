import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor (
    private users: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.users.create(createUserDto);
    return this.users.save(user);
  }
  
  findByUsername(username: string): Promise<User | null> {
    return this.users.findOneBy({ username });
  }

  findMe(id: string): Promise<User | null> {
    return this.users.findOneBy({ id });
  }
}
