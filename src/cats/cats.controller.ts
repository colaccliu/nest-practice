import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, Post, UseFilters, UseInterceptors } from '@nestjs/common'
import { CreateCatDto } from './dto/create-cat.dto'
import { Cat } from './interfaces/cat.interface'
import { CatsService }  from './cats.service'
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter'
import { catEntity } from 'src/common/entities/cat.entity'


@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {}

    @Get()
    async findAll():Promise<any> {
        return this.catsService.findAll()
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('findOne')
    async findOne():Promise<any> {
        return new catEntity({
            name: 'cola',
            age: '3',
            breed: 'miaomiao',
            color: 'yellow'
        })
    }

    @Post('add')
    @UseFilters(HttpExceptionFilter) // 使用类，可以在整个模块中使用同一实例，减少内存使用
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto)
    }
}