import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AutorDTO } from '../dtos/autor-dto';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutoresService {

  actualizarAutor(autor: AutorDTO): Observable<any> {
    return this.http.put(`${environment.API_ENDPOINT}/api/autores/${autor.id}`, autor)
      .pipe(
        tap(autorActualizado => console.log(`autor actualizado correctamente ${autorActualizado}`)),
        catchError(this.handleError)
      );
  }


  constructor(private http: HttpClient) { }

  obtenerAutores(): Observable<AutorDTO[]> {
    return this.http.get<AutorDTO[]>(`${environment.API_ENDPOINT}/api/autores`)
      .pipe(
        tap(autores => console.log('autores recuperados')),
        catchError(this.handleError)
      );
  }

  obtenerAutor(id: number): Observable<AutorDTO> {
    
    return this.http.get<AutorDTO>(`${environment.API_ENDPOINT}/api/autores/${id}`)
      .pipe(
        tap(autores => console.log(`autor con id ${id} recuperado`)),
        catchError(this.handleError)
      );
  }

  crearAutor(autor: AutorDTO): Observable<any> {
    return this.http.post(`${environment.API_ENDPOINT}/api/autores`, autor)
      .pipe(
        tap(nuevoAutor => console.log(`nuevo autor dado de alta correctamente ${nuevoAutor}`)),
        catchError(this.handleError)
      );
  }

  borrarAutor(idAutor: number) {
    return this.http.delete<any>(`${environment.API_ENDPOINT}/api/autores/${idAutor}`)
      .pipe(
        tap(_ => console.log(`Autor borrado con id ${idAutor}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
 

}
