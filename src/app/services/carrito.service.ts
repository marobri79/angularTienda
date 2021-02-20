import { Injectable, Output, EventEmitter } from '@angular/core';
import { CarritoDTO } from '../dtos/carrito-dto';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemCarritoDTO } from '../dtos/item-carrito-dto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carrito: CarritoDTO = null;
  carritoChanges: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) { }

  getCarrito(): CarritoDTO {
    return this.carrito;
  }

  obtenerCarrito(idUsuario: number): void {
    this.http.get<CarritoDTO>(`${environment.API_ENDPOINT}/api/usuarios/${idUsuario}/carrito`)
      .subscribe(
        data => {
          this.carrito = data;
          this.notificar();
        },
        error => this.handleError
      );
  }

  agregarLineaAlCarrito(idUsuario: number, itemCarritoDTO: ItemCarritoDTO): void {
    this.http.put<CarritoDTO>(`${environment.API_ENDPOINT}/api/usuarios/${idUsuario}/carrito`, itemCarritoDTO)
      .subscribe(
        data => {
          this.carrito = data,
          this.notificar();
        },
        error => this.handleError
      );
  }

  notificar() {
    this.carritoChanges.next('hubo cambios');
  }
  
  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

}
