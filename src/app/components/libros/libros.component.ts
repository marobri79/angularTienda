import { Component, OnInit, OnDestroy } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { LibroDTO } from '../../dtos/libro-dto';
import { LibrosService } from '../../services/libros.service';
import { LIBRO_BORRAR, LIBRO_CREAR } from '../../constantes';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemCarritoDTO } from 'src/app/dtos/item-carrito-dto';
import Swal from 'sweetalert2';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnDestroy, OnInit {

  libros: LibroDTO[];
  mostrarCrearLibro: boolean = false;
  mostrarAcciones: boolean = false;

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<LibroDTO[]> = new Subject();

  constructor(
    private librosService: LibrosService,
    private tokenStorageService: TokenStorageService,
    private carritoService: CarritoService
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

    this.recuperarLibros();

    this.mostrarCrearLibro = this.tokenStorageService.getFuncionalidades().has(LIBRO_CREAR);
    this.mostrarAcciones = this.tokenStorageService.getFuncionalidades().has(LIBRO_BORRAR);
  }

  private recuperarLibros() {
    this.librosService.obtenerLibros().subscribe((res: any) => {
      this.libros = res;
      this.dtTrigger.next();
    }, err => {
      this.libros = [];
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se produjo un error obtiendo los libros',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  borrarLibro(idLibro: number) {
    const estasDeAcuerdo = confirm(`¿Estas seguro que quieres borrar el libro con id ${idLibro}?`);
    if (estasDeAcuerdo === true) {
      this.librosService.borrarLibro(idLibro)
        .subscribe((res: any) => {
          console.log(`Libro borrado correctamente con ${idLibro}`);
          this.recuperarLibros();
        }, err => {
          alert(err.error.message);
        });
    }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  getUrlPhoto(libro: LibroDTO) {
    return `${environment.API_ENDPOINT}/imagenes/${libro.identificadorImagen}`;
  }

  setDefaultUrlPhoto(event) {
    let defaultPhotoUrl = `${environment.API_ENDPOINT}/imagenes/default`;
    event.target.src = defaultPhotoUrl;
  }

  agregarAlCarrito(idLibro: number, cantidad: number, precio: number) {
    let itemCarritoDTO: ItemCarritoDTO = new ItemCarritoDTO();
    itemCarritoDTO.idLibro = idLibro;
    itemCarritoDTO.cantidad = cantidad;
    itemCarritoDTO.precio = precio;

    let idUsuario = this.tokenStorageService.getUsuario().id;

    this.carritoService.agregarLineaAlCarrito(idUsuario, itemCarritoDTO);
  }

  obtenerCantidadInput(event: { target: HTMLInputElement; }) {
    const agregarAlCarroButton = event.target;
    const parent = agregarAlCarroButton.parentNode;
    const cantidad = Number.parseInt(parent.querySelector("input").value);
    return cantidad;
  }

}
