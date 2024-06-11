import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query, Patch } from '@nestjs/common';

import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/confing';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { OrderStatus } from './enum/order.enum';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly natsClient: ClientProxy
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.natsClient.send('createOrder', createOrderDto)
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.natsClient.send('findAllOrders', orderPaginationDto)
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    
    try {
      const order = await firstValueFrom(
        
        this.natsClient.send('findOneOrder', { id })

      );

      return order;

    } catch (error) {

      throw new RpcException(error)
    }
  }

  @Get(':status')
  async findByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto
  ){
    try {
      return this.natsClient.send('findAllOrders', {
        ...paginationDto,
        status: statusDto.status
      })

    } catch (error) {
      throw new RpcException(error);      
    }
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto
  ){
    try {
      return this.natsClient.send('changeOrderStatus', { id, status: statusDto.status})
    } catch (error) {
      throw new RpcException(error)
    }
  }

}
