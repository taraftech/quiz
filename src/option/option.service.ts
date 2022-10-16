import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOptionDto } from 'src/dto/option/create-option.dto';
import { UpdateOptionDto } from 'src/dto/option/update-option.dto';
import { IOption } from 'src/interface/option.interface';

@Injectable()
export class OptionService {
  constructor(@InjectModel('Option') private OptionModel: Model<IOption>) {}

  async createOption(createOptionDto: CreateOptionDto): Promise<IOption> {
    const newOption = await new this.OptionModel(createOptionDto);
    return newOption.save();
  }

  async updateOption(
    optionId: string,
    updateOptionDto: UpdateOptionDto,
  ): Promise<IOption> {
    const existingOption = await this.OptionModel.findByIdAndUpdate(
      optionId,
      updateOptionDto,
      { new: true },
    );
    if (!existingOption)
      throw new NotFoundException(`Option #${optionId} not found!`);
    return existingOption;
  }

  async deleteOption(optionId: string): Promise<IOption> {
    const existingOption = await this.OptionModel.findByIdAndDelete(optionId);
    if (!existingOption) {
      throw new NotFoundException(`Option #${optionId} not found!`);
    }
    return existingOption;
  }
}
