import { Component } from '@angular/core';
import { SocketService } from './socket.service';
import { Observable } from 'rxjs';
import { CesarService } from './cesar.service';
import { CryptoService } from './crypto.service';
import { FormData } from './form.data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client-socketio';

  messageList:  string[] = [];   //lista per messaggi criptati
  messDecifrati: string[] = [];  //lista per messaggi decifrati
  obsMess : Observable<Object>;

  encryptionKey: string;
  message: string;

  constructor(private socketService: SocketService, private cesarService: CesarService, private cryptoService: CryptoService) {
  }

  sendMessage(formData: FormData) {
    console.log("form input: " + JSON.stringify(formData));

    let encoded: FormData = formData; //Preparo una variabile da criptare
    switch (formData.messageType) {
      //Se il tipo di messaggio è cesar allora cripto con cesarService
      case "cesar":
        encoded.message = this.cesarService.encode(formData.message, Number(this.encryptionKey));
        break;
      //Se il tipo di messaggio è t-des allora cripto con cryptoService.encodeDes
      case "t-des":
        encoded.message = this.cryptoService.encodeDes(formData.message, this.encryptionKey);
        break;

      case "aes":
        encoded.message = this.cryptoService.encodeAes(formData.message, this.encryptionKey);
        break;
    }
    //Invio il messaggio cifrato
    this.socketService.sendMessage(JSON.stringify(encoded));

    this.message = "";
  }

  ngOnInit() {
    this.obsMess = this.socketService.getMessage();
    this.obsMess.subscribe(this.decodeData);
  }

  decodeData = (messageData: string) => {
    let received: FormData = JSON.parse(messageData);
    console.log("messagereceived: " + JSON.stringify(received))

    switch (received.messageType) {
      case "cesar":
        received.message = this.cesarService.decode(received.message, Number(this.encryptionKey));
        break;

      case "t-des":
        received.message = this.cryptoService.decodeDes(received.message, this.encryptionKey);
        break;

      case "aes":
        received.message = this.cryptoService.decodeAes(received.message, this.encryptionKey);        //aggiunto caso cifratura AES
        break;
    }

    this.messageList.push("messaggio cifrato: " + messageData + " messaggio decifrato " + JSON.stringify(received));
  }


  //metodo per dire che il mio valore che scelgo è la chiave
  setEncryptionKey(offset : HTMLInputElement) {
    this.encryptionKey = offset.value;
  }
}
