import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Option, OptionSchema } from 'src/schemas/option.schema';
import { OptionController } from './option.controller';
import { OptionService } from './option.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Option.name,
        schema: OptionSchema,
      },
    ]),
  ],
  controllers: [OptionController],
  providers: [OptionService],
})
export class OptionModule {}
