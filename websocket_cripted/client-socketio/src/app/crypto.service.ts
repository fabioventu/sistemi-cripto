import { Injectable } from '@angular/core';
import * as Crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  decodeDes(encoded : string, desKey: string) : string
  {
    return Crypto.TripleDES.decrypt(encoded, desKey).toString(Crypto.enc.Utf8);
  }

  encodeDes(toEncode : string, desKey : string) : string
  {
    return Crypto.TripleDES.encrypt(toEncode, desKey).toString();
  }


  decodeAes(encoded : string, aesKey : string)
  {
    return Crypto.AES.decrypt(encoded, aesKey).toString(Crypto.enc.Utf8);
  }

  encodeAes(toEncode : string, aesKey : string)
  {
    return Crypto.AES.encrypt(toEncode, aesKey).toString();
  }

  constructor() { }
}
