import { configDotenv } from 'dotenv';
import { Environment } from 'src/_shared/environments';
import getApp from './app';

configDotenv();

async function main(): Promise<void> {
  const app = await getApp();
  const port = process.env.PORT || 3333;

  await app.listen(port);

  if (Environment.getEnvType() !== 'prod')
    console.log(`running server on: http://localhost:${port}`);
}

main();
