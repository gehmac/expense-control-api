import { Module } from '@nestjs/common';
import { ControllersModule } from 'src/controllers/controller.module';

@Module({
  imports: [ControllersModule],
  providers: [],
})
export class AppModule {}
