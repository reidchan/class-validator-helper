import 'reflect-metadata';
import { Validate } from '../src';

import {
  IsString,
  ArrayMinSize,
  IsArray,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';

import { Type } from 'class-transformer';

class Tag {
  @IsString({
    message: '必须为string类型'
  })
  @IsNotEmpty()
  name: string;
}

class Item {
  @IsString({
    message: '必须为string类型'
  })
  @IsNotEmpty()
  title: string;

  @ValidateNested()
  @IsNotEmpty()
  @IsArray()
  @Type(() => Tag)
  tags: Tag[];
}

const body = {
  items: [{
    title: '11',
    tag: [{
      name: 'tag11'
    }]
  }, {
    title: '22',
    tag: [{
      name: 'tag22'
    }]
  }]
};

class Body {
  @ValidateNested()
  @ArrayMinSize(1)
  @IsArray()
  @IsNotEmpty()
  @Type(() => Item)
  items: Item[];
}


(async () => {
  await Validate(Body, body);
})();
