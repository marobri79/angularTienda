import { Component, OnDestroy, OnInit } from '@angular/core';
import { EditorialDTO } from 'src/app/dtos/editorial-dto';
import { EditorialesService } from 'src/app/services/editoriales.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { EDITORIAL_BORRAR, EDITORIAL_CREAR } from '../../constantes';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-editoriales',
  templateUrl: './editoriales.component.html',
  styleUrls: ['./editoriales.component.css']
})
export class EditorialesComponent implements OnInit, OnDestroy {

  
  editoriales: EditorialDTO[];
  mostrarCrearEditorial: boolean = false;
  mostrarAcciones: boolean = false;
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<EditorialDTO[]> = new Subject();
  constructor(
    private editorialesService: EditorialesService,
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


    this.recuperEditoriales();
    this.mostrarCrearEditorial = this.tokenStorageService.getFuncionalidades().has(EDITORIAL_CREAR);
    this.mostrarAcciones = this.tokenStorageService.getFuncionalidades().has(EDITORIAL_BORRAR);

  }

  private recuperEditoriales() {
    this.editorialesService.obtenerEditoriales().subscribe((res: any) => {
      this.editoriales= res;
      this.dtTrigger.next();
    }, err => {
      this.editoriales = [];
      alert("Se produjo un error obteniendo los editoriales");
    });
  }

  borrarEditorial(idEditorial: number) {
    const estasDeAcuerdo = confirm(`¿Estas seguro que quieres borrar el editorial con id ${idEditorial}?`);
    if (estasDeAcuerdo === true) {
      this.editorialesService.borrarEditorial(idEditorial)
      .subscribe((res: any) => {
        console.log(`Editorial borrado correctamente con ${idEditorial}`);
        this.recuperEditoriales();
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

