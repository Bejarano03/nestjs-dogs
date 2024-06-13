import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, HttpStatus } from '@nestjs/common';

// In-memory data storage (for demonstration purposes)
let dogs = [
  { id: 1, name: 'Buddy', age: 3 },
  { id: 2, name: 'Max', age: 5 },
];

@Controller('dogs')
export class DogsController {

  @Get()
  findAll(): any[] {
    return dogs;
  }

  @Post()
  create(@Body() dog: { name: string, age: number }): any {
    const newDog = { id: dogs.length + 1, ...dog };
    dogs.push(newDog);
    return newDog;
  }

  @Get(':id')
  findOne(@Param('id') id: number): any {
    const dog = dogs.find(d => d.id === +id);
    if (!dog) {
      throw new NotFoundException(`Dog with ID ${id} not found`);
    }
    return dog;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updatedDog: { name: string, age: number }): any {
    const index = dogs.findIndex(d => d.id === +id);
    if (index === -1) {
      throw new NotFoundException(`Dog with ID ${id} not found`);
    }
    dogs[index] = { ...dogs[index], ...updatedDog };
    return dogs[index];
  }

  @Delete(':id')
  remove(@Param('id') id: number): any {
    const index = dogs.findIndex(d => d.id === +id);
    if (index === -1) {
      throw new NotFoundException(`Dog with ID ${id} not found`);
    }
    const removedDog = dogs.splice(index, 1)[0];
    return removedDog;
  }
}
