import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ZodSchema, z } from 'zod';

@Injectable()
export class ZodValidationPipe<T extends ZodSchema<z.infer<T>>>
  implements PipeTransform
{
  constructor(private schema: T) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const result = this.schema.safeParse(value);

    if (result.success) {
      return result.data;
    }

    switch (metadata.type) {
      default:
        throw result.error;
    }
  }
}
