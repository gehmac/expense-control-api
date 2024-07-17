import { Controller, Get } from '@nestjs/common';

@Controller({
  path: 'test',
  version: '*',
})
export class Ping {
  @Get()
  test(): string {
    return 'hello world';
  }
}
