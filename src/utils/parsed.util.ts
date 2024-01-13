import { BadRequestException } from '@nestjs/common';

export class ParsedUtil {
  public static parseID(id: string): number {
    const parsedID = Number(id);

    if (Number.isNaN(parsedID)) {
      throw new BadRequestException('Invalid ID');
    }

    return parsedID;
  }
}
