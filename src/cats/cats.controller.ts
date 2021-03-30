import { Body, Controller, Get, HttpException, Post, UseFilters } from '@nestjs/common'
import { CreateCatDto } from './dto/create-cat.dto'
import { Cat } from './interfaces/cat.interface'
import { CatsService }  from './cats.service'
import { HttpExceptionFilter } from '../../src/common/filters/http-exception.filter'


@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {}

    @Get()
    async findAll():Promise<any> {
        return this.catsService.findAll()
    }

    @Post()
    @UseFilters(HttpExceptionFilter) // 使用类，可以在整个模块中使用同一实例，减少内存使用
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto)
    }
}