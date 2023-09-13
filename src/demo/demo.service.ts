import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { LoginDTO } from './dto/login.dto';
import { CreateUserDTO } from './dto/createUser.dto';

@Injectable()
export class DemoService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  getHelloWorld() {
    return 'Hello world';
  }

  async createUser(user: CreateUserDTO) {
    user.password = await bcrypt.hash(user.password, 10);
    const userData: User = new User();
    userData.email = user.email;
    userData.firstName = user.firstName;
    userData.lastName = user.lastName;
    userData.password = user.password;
    userData.role = user.role;
    const data = await this.userRepo.save(userData);
    return data;
  }

  async login(loginData: LoginDTO) {
    const user = await this.userRepo.findOne({
      where: { email: loginData.email },
    });
    if (!user)
      throw new HttpException(
        'User not found with this email.',
        HttpStatus.UNAUTHORIZED,
      );

    const match = await bcrypt.compare(loginData.password, user.password);
    if (!match)
      throw new HttpException('passord incorrect.', HttpStatus.BAD_REQUEST);

    // if all goes right then create JWT
    const payload = {
      userId: user.id,
    };

    const token = jwt.sign(payload, 'secret-key', { expiresIn: 3600 });

    return {
      token,
    };
  }
}
