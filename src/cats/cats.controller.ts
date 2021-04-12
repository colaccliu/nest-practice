import { Body, ClassSerializerInterceptor, Controller, Get, Post, SetMetadata, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common'
import { CreateCatDto } from './dto/create-cat.dto'
import { Cat } from './interfaces/cat.interface'
import { CatsService }  from './cats.service'
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter'
import { catEntity } from 'src/common/entities/cat.entity'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { Roles } from 'src/common/decorators/role.decorator'


@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  //   @SetMetadata('roles', ['admin'])
  @Roles('admin')
  async findAll(): Promise<any> {
    return this.catsService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('findOne')
  // @SetMetadata('roles', ['guest'])，用装饰器封装一层
  @Roles('guest')
  async findOne(): Promise<any> {
    return new catEntity({
      name: 'cola',
      age: '3',
      breed: 'miaomiao',
      color: 'blue',
    });
  }

  @Post('add')
  @Roles('test')
  @UseFilters(HttpExceptionFilter) // 使用类，可以在整个模块中使用同一实例，减少内存使用
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }
}