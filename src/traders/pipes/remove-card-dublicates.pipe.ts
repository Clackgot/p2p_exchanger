import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateTraderDto } from '../dto/create-trader.dto';

@Injectable()
export class RemoveCardDublicatesPipe implements PipeTransform {
  transform(value: CreateTraderDto, metadata: ArgumentMetadata) {
    if (metadata?.type === 'body' && value.bankCards) {
      const uniqueBankCards = value.bankCards.filter(
        (card: any, index: any, self: any) =>
          index === self.findIndex((c: any) => c.number === card.number),
      );
      value.bankCards = uniqueBankCards;
    }
    return value;
  }
}
