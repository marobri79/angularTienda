import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';

import { API_ENDPOINT_AUTENTICACION_URL, API_ENDPOINT_REGISTRO_URL, API_HTTP_OPTIONS } from 'src/app/constantes';
import { UsuarioDTO } from '../dtos/usuario-dto';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private http: HttpClient) { }

  login(credenciales): Observable<any> {
    return this.http.post(
      API_ENDPOINT_AUTENTICACION_URL, {
        username: credenciales.username,
        password: credenciales.password
      },
      API_HTTP_OPTIONS
    );
  }

  registro(usuario: UsuarioDTO): Observable<any> {
    return this.http.post(API_ENDPOINT_REGISTRO_URL, usuario, API_HTTP_OPTIONS);
  }

}
