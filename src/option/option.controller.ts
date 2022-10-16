import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateOptionDto } from 'src/dto/option/create-option.dto';
import { UpdateOptionDto } from 'src/dto/option/update-option.dto';
import { OptionService } from './option.service';

@Controller('option')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post()
  async createOption(
    @Res() response,
    @Body() createOptionDto: CreateOptionDto,
  ) {
    try {
      const newOption = await this.optionService.createOption(createOptionDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'option successfully created',
        newOption,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: option not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  async getOptions(@Res() response) {
    try {
      const optionData = await this.optionService.getOptions();
      return response.status(HttpStatus.OK).json({
        message: 'options found',
        optionData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('/:id')
  async updateOption(
    @Res() response,
    @Body() updateOptionDto: UpdateOptionDto,
    @Param('id') optionId: string,
  ) {
    try {
      const updateOption = await this.optionService.updateOption(
        optionId,
        updateOptionDto,
      );
      return response.status(HttpStatus.OK).json({
        message: `option #${optionId} have been successfully updated`,
        updateOption,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteOption(@Res() response, @Param('id') optionId: string) {
    try {
      const deletedOption = await this.optionService.deleteOption(optionId);
      return response.status(HttpStatus.OK).json({
        message: `option #${optionId} has been successfully deleted`,
        deletedOption,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
