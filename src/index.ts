import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export async function Validate(schema, data) {
  const schemaClass = plainToClass(schema, data);
  const errors = await validate(schemaClass);
  if (errors.length > 0) {
    const error = errors[0];
    const property = error.property;
    handleError(property, error);
  }
}

function handleError(property, error) {
  if (error.constraints) {
    const constraintKey = Object.keys(error.constraints)[0];
    const errorMsg = error.constraints[constraintKey];
    throw new Error(errorMsg + ` [${property}]`);
  }
  if (error.children) {
    for (const child of error.children) {
      const childProperty = child.property;
      handleError(`${property}.${childProperty}`, child);
    }
  }
}