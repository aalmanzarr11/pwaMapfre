import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperStringsService {

    //Helper para control de flujo por perfiles
    public UsuarioActivo: string = null;
    public static carmaxage = null;
    public MessageCarMaxAge: string = 'No cumple con los requisitos';

    //control de session
    public NombreUser: string = null;
    //Url de retorno E-Market
    public ReturnURL: string;
}
