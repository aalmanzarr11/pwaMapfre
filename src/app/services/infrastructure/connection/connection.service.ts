import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// import { Events } from 'ionic-angular'
// import { Network } from '@ionic-native/network'

export enum ConnectionStatus {
  Online,
  Offline
}

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  public status: ConnectionStatus;
  private _status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(null);

  constructor(
    //   public network: Network,
    //   public events: Events
  ) {
      this.status = ConnectionStatus.Online;
  }

  public initializeNetworkEvents(): void {

    //   /* OFFLINE */
    //   this.network.onDisconnect().subscribe(() => {
    //       if (this.status === ConnectionStatus.Online) {
    //           this.setStatus(ConnectionStatus.Offline);
    //       }
    //   })

    //   /* ONLINE */
    //   this.network.onConnect().subscribe(() => {
    //       if (this.status === ConnectionStatus.Offline) {
    //           this.setStatus(ConnectionStatus.Online);
    //       }
    //   })

  }

  public getNetworkType(): string {
    //   return this.network.type
    return "";
  }

  public getNetworkStatus(): Observable<ConnectionStatus> {

      //console.log(this.status);
      return this._status.asObservable();
  }
  
  private setStatus(status: ConnectionStatus) {
      this.status = status;
      this._status.next(this.status);
  }

}
