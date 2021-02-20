import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarritoDTO } from '../dtos/carrito-dto';
import { throwError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ItemCarritoDTO } from '../dtos/item-carrito-dto';
import { UsuarioDTO } from '../dtos/usuario-dto';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
 

  constructor(private http: HttpClient) { }

  
  actualizarUsuario(usuario: UsuarioDTO): Observable<any> {
    return this.http.put(`${environment.API_ENDPOINT}/api/usuarios/${usuario.id}`, usuario)
      .pipe(
        tap(usuarioActualizado => console.log(`usuario actualizado correctamente ${usuarioActualizado}`)),
        catchError(this.handleError)
      );
  }

  obtenerUsuarios(): Observable<UsuarioDTO[]> {
    return this.http.get<UsuarioDTO[]>(`${environment.API_ENDPOINT}/api/usuarios`)
      .pipe(
        tap(usuarios => console.log('usuarios recuperados')),
        catchError(this.handleError)
      );
  }

  obtenerUsuario(id: number): Observable<UsuarioDTO> {
    
    return this.http.get<UsuarioDTO>(`${environment.API_ENDPOINT}/api/usuarios/${id}`)
      .pipe(
        tap(usuarios => console.log(`usuarios con id ${id} recuperado`)),
        catchError(this.handleError)
      );
  }

  crearUsuario(usuario: UsuarioDTO): Observable<any> {
    return this.http.post(`${environment.API_ENDPOINT}/api/usuarios`,usuario)
      .pipe(
        tap(nuevoUsuario => console.log(`nuevo usuario dado de alta correctamente ${nuevoUsuario}`)),
        catchError(this.handleError)
      );
  }

  borrarUsuario(idUsuario: number) {
    return this.http.delete<any>(`${environment.API_ENDPOINT}/api/usuarios/${idUsuario}`)
      .pipe(
        tap(_ => console.log(`Usuario borrado con id ${idUsuario}`)),
        catchError(this.handleError)
      );
  }
  
  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
