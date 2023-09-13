import { Body, Controller, Get, Post } from '@nestjs/common';
import { DemoService } from './demo.service';
import { LoginDTO } from './dto/login.dto';
import { CreateUserDTO } from './dto/createUser.dto';

@Controller('/demo')
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @Get('/hello')
  getHello(): string {
    return this.demoService.getHelloWorld();
  }

  @Post('/create')
  createUser(@Body() user: CreateUserDTO) {
    console.log(user);
    return this.demoService.createUser(user);
  }

  @Post('/login')
  login(@Body() loginDTO: LoginDTO) {
    return this.demoService.login(loginDTO);
  }

  // just a demo URL to test authorization
  @Get('/dashboard')
  getDashboard() {
    return 'hello';
  }
}
