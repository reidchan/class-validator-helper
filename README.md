# class-validator-helper
<p>
  <img src="https://img.shields.io/badge/version-0.0.4-ff69b4.svg"/>
  <img src="https://img.shields.io/packagist/l/doctrine/orm.svg"/>
</p>

本工具主要是基于[class-validator](https://github.com/typestack/class-validator)和[class-transformer](https://github.com/typestack/class-transformer)做了一层简单的封装，让用户可以快速对json格式的数据进行校验，并打印出具体的参数位置。

# 快速开始
以下代码body没有传递`address.area`参数：
```ts
import { Validate } from 'class-validator-helper';

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
```

故会报错抛出一个`Error`，方括号的内容为具体的参数位置，而前面是`class-validator`默认的提示信息，本工具会陆续取出错误信息（每次报错只会随机获取一个），直到没有错误为止：
```
Error: area should not be empty [address.area]
```

# 版本
| 版本 | 文档 | 上线时间 |
| ---- | ---- | ----  |
| v0.0.4 | [点击跳转](https://www.yuque.com/super2god/open-source/class-validator-helper-v0.0.4) | 2021-07-23 |

# 其他示例（校验数组）
以下示例`addresses`的第二个元素没有`area`字段：
```ts
import { Validate } from 'class-validator-helper';

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
```

抛出的错误信息：
```
Error: area should not be empty [addresses.1.area]
```

# 加入小组来面基~
由于本人很少上QQ，所以建的是微信群，而微信群码很快就失效，所以想进交流群的小伙伴加我微信噢\~~我拉你进群，欢迎大佬们加入☺️

<img width="300" src="https://super-github.oss-cn-shenzhen.aliyuncs.com/common/wxqrcode.jpeg"/>
