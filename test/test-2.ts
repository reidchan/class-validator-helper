import 'reflect-metadata';
import { Validate } from '../src';

import {
  IsString,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';

import { Type } from 'class-transformer';

class CreateUserBody$Address {
  @IsString()
  @IsNotEmpty()
  province: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  area: string;

  @IsString()
  @IsNotEmpty()
  detail: string;
}

class CreateUserBody {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateUserBody$Address)
  addresses: CreateUserBody$Address[];
}

const body = {
  addresses: [{
    province: '广东省',
    city: '广州市',
    area: '越秀区',
    detail: '开心花园'
  }, {
    province: '广东省',
    city: '揭阳市',
    detail: '开心农场'
  }]
};


(async () => {
  await Validate(CreateUserBody, body);
})();
