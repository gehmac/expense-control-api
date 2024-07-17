import { Module } from '@nestjs/common';
import { Ping } from './ping/ping.controller';

@Module({
  imports: [],
  controllers: [Ping],
})
export class ControllersModule {}
