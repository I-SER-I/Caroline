import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import supertokens from 'supertokens-node';

async function start() {
  const port = process.env.PORT || 3001;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: [
      process.env.AUTH_WEBSITE_DOMAIN,
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:80',
      'http://158.160.44.208',
      'http://158.160.44.208:80',
      'http://imcaroline.me',
      'http://imcaroline.me:80',
    ],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('Caroline')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port, () => console.log('Run on port: ', port));
}

start();
