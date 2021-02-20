import { Component, OnInit, OnDestroy } from '@angular/core';
import { AutorDTO } from 'src/app/dtos/autor-dto';
import { AutoresService } from 'src/app/services/autores.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AUTOR_BORRAR, AUTOR_CREAR } from '../../constantes';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css']
})
export class AutoresComponent implements OnDestroy, OnInit {

  autores: AutorDTO[];
  mostrarCrearAutor: boolean = false;
  mostrarAcciones: boolean = false;

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<AutorDTO[]> = new Subject();

  constructor(
    private autoresService: AutoresService,
    private tokenStorageService: TokenStorageService
  ) { }


  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      info: true,
      retrieve: true,
      language: {
        emptyTable: '',
        zeroRecords: 'No hay coincidencias',
        lengthMenu: 'Mostrar _MENU_ elementos',
        search: 'Buscar:',
        info: 'De _START_ a _END_ de _TOTAL_ elementos',
        infoEmpty: 'De 0 a 0 de 0 elementos',
        infoFiltered: '(filtrados de _MAX_ elementos totales)',
        paginate: {
          first: 'Prim.',
          last: 'Últ.',
          next: 'Sig.',
          previous: 'Ant.'
        }
      }
    };


    this.recuperAutores();
    this.mostrarCrearAutor = this.tokenStorageService.getFuncionalidades().has(AUTOR_CREAR);
    this.mostrarAcciones = this.tokenStorageService.getFuncionalidades().has(AUTOR_BORRAR);

  }

  private recuperAutores() {
    this.autoresService.obtenerAutores().subscribe((res: any) => {
      this.autores = res;
      this.dtTrigger.next();
    }, err => {
      this.autores = [];
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se produjo un error obteniendo los autores',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  borrarAutor(idAutor: number) {
    const estasDeAcuerdo = confirm(`¿Estas seguro que quieres borrar el autor con id ${idAutor}?`);
    if (estasDeAcuerdo === true) {
      this.autoresService.borrarAutor(idAutor)
      .subscribe((res: any) => {
        console.log(`Autor borrado correctamente con ${idAutor}`);
        this.recuperAutores();
      }, err => {
        alert(err.error.message);
      });
    }
    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}

