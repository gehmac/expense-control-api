import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.modules';
import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';

export function configureApp(appModule: INestApplication): void {
  appModule.enableCors({
    origin: '*',
  });
  appModule.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  appModule.enableVersioning();
}

async function createAppModule(): Promise<NestExpressApplication> {
  const appModule = await NestFactory.create<NestExpressApplication>(AppModule);
  configureApp(appModule);

  return appModule;
}
export default async function getApp(): Promise<INestApplication> {
  let app: INestApplication;
  if (!app) {
    app = await createAppModule();
    await app.init();
  }

  return app;
}
