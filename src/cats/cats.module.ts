import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'
import { LoggerMiddleware } from '../common/middleware/logger.middleware'
@Module({
    controllers: [CatsController],
    providers: [CatsService],
})
export class CatsModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware)
        .forRoutes({
            path: '/cats', // 'cats'也可
            method: RequestMethod.GET
        })
    }
}