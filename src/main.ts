import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import * as fs from 'fs';

async function start() {
  const port = process.env.PORT || 3001;
  const httpsOptions = {
    key: fs.readFileSync('./secrets/private-key.pem'),
    cert: fs.readFileSync('./secrets/public-certificate.pem'),
    hostname: 'imcaroline.me',
  };

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new FastifyAdapter({ https: httpsOptions }),
  );
  // app.enableCors({
  //   origin: [
  //     process.env.AUTH_WEBSITE_DOMAIN,
  //     'http://' + process.env.WEBSITE_DOMAIN,
  //     'http://' + process.env.WEBSITE_DOMAIN + ':80',
  //     'http://' + process.env.WEBSITE_DOMAIN + ':3000',
  //     'http://' + process.env.WEBSITE_DOMAIN + ':3001',
  //     'https://' + process.env.WEBSITE_DOMAIN,
  //     'https://' + process.env.WEBSITE_DOMAIN + ':80',
  //     'https://' + process.env.WEBSITE_DOMAIN + ':3000',
  //     'https://' + process.env.WEBSITE_DOMAIN + ':3001',
  //   ],
  //   allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
  //   credentials: true,
  // });
  console.log(httpsOptions);
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
