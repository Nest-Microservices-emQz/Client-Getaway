import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/confing';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { error } from 'console';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly natsClient : ClientProxy
  ) {}

  @Post()
  createProduct(
    @Body() createProductDto: CreateProductDto
  ){
    return this.natsClient.send({cmd: 'create_product' }, createProductDto)
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto){
    return this.natsClient.send({cmd: 'find_all_products'}, paginationDto)
  }

  @Get(':id')
  async findOne(@Param('id') id: string){
    
    // ESTE CODIGO FUNCIONA DE LA MISMA MANERA QUE EL DE ABAJO DE TRY CATCH
    // return this.natsClient.send({cmd: 'find_by_id'}, {id})
    //   .pipe(
    //     catchError(err => { throw new RpcException(err)})
    //   )

    try {

      const product = await firstValueFrom(
        this.natsClient.send({ cmd: 'find_by_id' }, {id})
      )

      return product;

    } catch (error) {
      throw new RpcException(error)
    }
  }

  
  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ){
    return this.natsClient.send(
      { cmd: 'update_product' }, 
      {id, ...updateProductDto} 
    ).pipe(catchError(err => {throw new RpcException(err)}))
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.natsClient.send({ cmd: 'delete_product' }, { id })
      .pipe(
        catchError( err => {throw new RpcException(err)})
      )
  }

}
