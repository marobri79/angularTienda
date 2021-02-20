import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioDTO } from 'src/app/dtos/usuario-dto';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { USUARIO_CREAR, USUARIO_BORRAR } from '../../constantes';
import { Subject } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnDestroy, OnInit {

  usuarios: UsuarioDTO[];
  mostrarCrearUsuaio: boolean = false;
  mostrarAcciones: boolean = false;

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<UsuarioDTO[]> = new Subject();

  constructor(
    private usuaiosService: UsuariosService,
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

    this.recuperUsuaios();
    this.mostrarCrearUsuaio = this.tokenStorageService.getFuncionalidades().has(USUARIO_CREAR);
    this.mostrarAcciones = this.tokenStorageService.getFuncionalidades().has(USUARIO_BORRAR);

  }

  private recuperUsuaios() {
    this.usuaiosService.obtenerUsuarios().subscribe((res: any) => {
      this.usuarios = res;
      this.dtTrigger.next();
    }, err => {
      this.usuarios = [];
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se produjo un error obteniendo los usuaios',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  borrarUsuario(idUsuario: number) {
    const estasDeAcuerdo = confirm(`¿Estas seguro que quieres borrar el Usuaio con id ${idUsuario}?`);
    if (estasDeAcuerdo === true) {
      this.usuaiosService.borrarUsuario(idUsuario)
      .subscribe((res: any) => {
        console.log(`Usuario borrado correctamente con ${idUsuario}`);
        this.recuperUsuaios();
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
