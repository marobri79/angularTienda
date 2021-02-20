import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LibroDTO } from '../dtos/libro-dto';
import { throwError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  constructor(private http: HttpClient) { }

  obtenerLibros(): Observable<LibroDTO[]> {
    return this.http.get<LibroDTO[]>(`${environment.API_ENDPOINT}/api/libros`)
      .pipe(
        tap(libros => console.log('libros recuperados')),
        catchError(this.handleError)
      );
  }

  obtenerLibro(id: number): Observable<LibroDTO> {
    
    return this.http.get<LibroDTO>(`${environment.API_ENDPOINT}/api/libros/${id}`)
      .pipe(
        tap(libros => console.log(`libro con id ${id} recuperado`)),
        catchError(this.handleError)
      );
  }

  crearLibro(libro: LibroDTO): Observable<any> {
    return this.http.post(`${environment.API_ENDPOINT}/api/libros`, libro)
      .pipe(
        tap(nuevoLibro => console.log(`nuevo libro dado de alta correctamente ${nuevoLibro}`)),
        catchError(this.handleError)
      );
  }

  
  actualizarLibro(libro: LibroDTO): Observable<any> {
    return this.http.put(`${environment.API_ENDPOINT}/api/libros/${libro.id}`, libro)
      .pipe(
        tap(libroActualizado => console.log(`libro actualizado correctamente ${libroActualizado}`)),
        catchError(this.handleError)
      );
  }

  borrarLibro(idLibro: number) {
    return this.http.delete<any>(`${environment.API_ENDPOINT}/api/libros/${idLibro}`)
      .pipe(
        tap(_ => console.log(`Libro borrado con id ${idLibro}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  async postFile(fileToUpload: File) {
    const endpoint = `${environment.API_ENDPOINT}/imagenes/subirFichero`;
    const formData: FormData = new FormData();
    formData.append('ficheroImagen', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData).toPromise();
  }
}
