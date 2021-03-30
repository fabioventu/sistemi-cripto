import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketService } from './socket.service';
import { CesarService } from './cesar.service';

const config: SocketIoConfig = { url: 'https://3000-coffee-iguana-f2lyeove.ws-eu03.gitpod.io/', options: {} };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [SocketService, CesarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
