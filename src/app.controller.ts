import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Auth0Guard } from './auth/auth0.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile')
  @UseGuards(Auth0Guard)
  profile(@Req() req: any) {
    console.log(req.auth);
    return req.auth;
  }
}
