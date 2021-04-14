import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module'
import { EventModule } from './gateways/events/events.module'

@Module({
  imports: [CatsModule, EventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
