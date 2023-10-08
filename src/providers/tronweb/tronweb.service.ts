import { BadRequestException, Injectable } from '@nestjs/common';
import applicationConstants from 'src/config/applicationConstants';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as TronWeb from 'tronweb';

interface TronAccount {
  privateKey: string;
  publicKey: string;
  address: {
    base58: string;
    hex: string;
  };
}

@Injectable()
export class TronwebService {
  private tronWeb = new TronWeb({
    fullHost: applicationConstants.TRONGRID.TRONGRID_API_URL,
    headers: {
      'TRON-PRO-API-KEY': applicationConstants.TRONGRID.TRONGRID_API_KEY,
    },
    privateKey: applicationConstants.STORAGE.PRIVATE_KEY,
  });

  fromMnemonic(mnimonic: string): TronAccount {
    const account = this.tronWeb.fromMnemonic(mnimonic);

    return account;
  }

  generateAddress(): TronAccount {
    const account = this.tronWeb.createRandom();

    return account;
  }

  async onModuleInit() {
    // await this.sendUSDTFromStorage('<ADDRESS>', 100)
    //   .then((data) => console.log(data))
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  // TODO: Рефакторинг. Обработка ошибок
  async sendUSDTFromStorage(
    toAddress: string,
    amount: number,
  ): Promise<string> {
    const recipientHex = this.tronWeb.address.toHex(toAddress);
    const tokenAddress = applicationConstants.TETHER_USDT_TOKEN_ADDRESS;
    const tx = await this.tronWeb.contract().at(tokenAddress);
    const tx2 = await tx.transfer(recipientHex, amount * 1_000_000);
    const tx3: string = await tx2.send();

    const transactionInfo = await this.tronWeb.trx.getTransaction(tx3);
    return transactionInfo;
  }

  // TODO: Рефакторинг. Обработка ошибок
  async sendTRXFromStorage(toAddress: string, amount: number) {
    const tradeobj = await this.tronWeb.transactionBuilder.sendTrx(
      this.tronWeb.address.toHex(toAddress),
      amount * 1_000_000,
      this.tronWeb.address.toHex(applicationConstants.STORAGE.ADDRESS),
    );
    const signedtxn = await this.tronWeb.trx.sign(
      tradeobj,
      applicationConstants.STORAGE.PRIVATE_KEY,
    );
    const transactionId = await this.tronWeb.trx.sendRawTransaction(signedtxn);
    return transactionId;
  }
}
