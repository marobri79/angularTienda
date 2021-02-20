import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PedidoDTO } from '../dtos/pedido-dto';
import { throwError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http: HttpClient) { }

  obtenerPedidos(): Observable<PedidoDTO[]> {
    return this.http.get<PedidoDTO[]>(`${environment.API_ENDPOINT}/api/pedidos`)
      .pipe(
        tap(pedidos => console.log('pedidos recuperados')),
        catchError(this.handleError)
      );
  }

  obtenerPedido(id: number): Observable<PedidoDTO> {
    
    return this.http.get<PedidoDTO>(`${environment.API_ENDPOINT}/api/pedidos/${id}`)
      .pipe(
        tap(pedido => console.log(`pedido con id ${id} recuperado`)),
        catchError(this.handleError)
      );
  }

  crearPedido(pedido: PedidoDTO): Observable<any> {
    return this.http.post(`${environment.API_ENDPOINT}/api/pedidos`, pedido)
      .pipe(
        tap(nuevoPedido => console.log(`nuevo pedido dado de alta correctamente ${nuevoPedido}`)),
        catchError(this.handleError)
      );
  }

  enviarPedido(pedidoId: number): Observable<any> {
    return this.http.put(`${environment.API_ENDPOINT}/api/pedidos/${pedidoId}/enviar`, null)
      .pipe(
        tap(pedidoEnviado => console.log(`El pedido se envio correctamente`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

}
