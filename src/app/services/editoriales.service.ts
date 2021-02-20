import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { EditorialDTO } from '../dtos/editorial-dto';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class EditorialesService {

  actualizarEditorial(editorial: EditorialDTO): Observable<any> {
    return this.http.put(`${environment.API_ENDPOINT}/api/editoriales/${editorial.id}`, editorial)
      .pipe(
        tap(editorialActualizado => console.log(`Editorial actualizado correctamente ${editorialActualizado}`)),
        catchError(this.handleError)
      );
  }


  constructor(private http: HttpClient) { }

  obtenerEditoriales(): Observable<EditorialDTO[]> {
    return this.http.get<EditorialDTO[]>(`${environment.API_ENDPOINT}/api/editoriales`)
      .pipe(
        tap(editoriales => console.log('editoriales recuperados')),
        catchError(this.handleError)
      );
  }

  obtenerEditorial(id: number): Observable<EditorialDTO> {
    
    return this.http.get<EditorialDTO>(`${environment.API_ENDPOINT}/api/editoriales/${id}`)
      .pipe(
        tap(editoriales => console.log(`editorial con id ${id} recuperado`)),
        catchError(this.handleError)
      );
  }
  crearEditorial(editorial: EditorialDTO): Observable<any> {
    return this.http.post(`${environment.API_ENDPOINT}/api/editoriales`, editorial)
      .pipe(
        tap(nuevoEditorial=> console.log(`nuevo editorial dado de alta correctamente ${nuevoEditorial}`)),
        catchError(this.handleError)
      );
  }


  borrarEditorial(idEditorial: number) {
    return this.http.delete<any>(`${environment.API_ENDPOINT}/api/editoriales/${idEditorial}`)
      .pipe(
        tap(_ => console.log(`Editorial borrado con id ${idEditorial}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
 

}

