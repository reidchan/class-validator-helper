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
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateUserBody$Address)
  address: CreateUserBody$Address;
}

const body = {
  name: 'Reid',
  address: {
    province: '广东省',
    city: '广州市',
    detail: '开心花园'
  }
};


(async () => {
  await Validate(CreateUserBody, body);
})();
