import { Injectable, Logger } from '@nestjs/common';

class AddressInfo {
  transactions: number;
  date_created: Date;
}

interface ITronscanService {
  getAddressInfo(address: string): AddressInfo;
}

@Injectable()
export class TronscanService implements ITronscanService {
  private logger = new Logger('TronscanService');
  constructor() {
    //this.getAddressInfo('TMCbjVa5kjF2JHhgcQzRhq8DneTC7x4Bit');
  }

  getAddressInfo(address: string): AddressInfo {
    return { date_created: new Date(), transactions: 5 };
  }
}
