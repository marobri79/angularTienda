import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  logout() {
    sessionStorage.clear();
  }

  public guardarToken(token: string) {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public guardarUsuarioDesdeToken(token: string) {
    const decoded = jwt_decode(token);
    const usuario = decoded["usuario"];
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.setItem(USER_KEY, JSON.stringify(usuario));
  }

  public getUsuario() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  public getFuncionalidades(): Set<string> {
    const funcs = new Set<string>();
    for (const func of this.getUsuario().funcionalidades) {
      funcs.add(func);
    }
    return funcs;
  }

}
